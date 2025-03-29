document.getElementById("fileInput").addEventListener("change", handleImageUpload);
document.getElementById("resizeBtn").addEventListener("click", resizeImage);
let resizedImageData = "";

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("previewImg").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function resizeImage() {
    const fileInput = document.getElementById("fileInput").files[0];
    if (!fileInput) {
        alert("Please upload an image first.");
        return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = function() {
        let newWidth = parseInt(document.getElementById("width").value) || img.width;
        let newHeight = parseInt(document.getElementById("height").value) || img.height;
        let maintainAspect = document.getElementById("aspectRatio").checked;

        // Maintain Aspect Ratio
        if (maintainAspect) {
            const aspectRatio = img.width / img.height;
            if (newWidth) {
                newHeight = Math.round(newWidth / aspectRatio);
            } else if (newHeight) {
                newWidth = Math.round(newHeight * aspectRatio);
            }
        }

        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        let quality = 1.0;
        const selectedFormat = document.querySelector('input[name="format"]:checked').value;
        let mimeType = `image/${selectedFormat}`;

        // KB-based resizing logic
        const targetSizeKB = parseInt(document.getElementById("sizeKB").value);
        if (!isNaN(targetSizeKB)) {
            let outputSize = canvas.toDataURL(mimeType, quality).length / 1024;
            while (outputSize > targetSizeKB && quality > 0.1) {
                quality -= 0.05;
                outputSize = canvas.toDataURL(mimeType, quality).length / 1024;
            }
        }

        // Store resized image data
        resizedImageData = canvas.toDataURL(mimeType, quality);
        document.getElementById("previewImg").src = resizedImageData;

        // Show the download button
        document.getElementById("downloadBtn").style.display = "block";
    };

    img.src = URL.createObjectURL(fileInput);
}

// Download Image Function
document.getElementById("downloadBtn").addEventListener("click", function() {
    if (!resizedImageData) {
        alert("Please resize an image first.");
        return;
    }

    const downloadLink = document.createElement("a");
    downloadLink.href = resizedImageData;
    downloadLink.download = "resized_image.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});
