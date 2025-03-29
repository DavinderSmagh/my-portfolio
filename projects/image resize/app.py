from flask import Flask, request, send_file, render_template
from PIL import Image
import os
from io import BytesIO

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

def resize_to_target_size(img, target_size_kb, format_choice):
    """
    Resize and compress an image to match the target file size (KB).
    Uses both quality reduction and image resizing.
    """
    img_io = BytesIO()
    quality = 95  # Start with high quality
    width, height = img.size  # Get original dimensions
    max_iterations = 25  # Limit iterations to avoid infinite loops
    iteration = 0

    while iteration < max_iterations:
        img_io.seek(0)
        img_io.truncate()

        # Save image with the current quality setting
        if format_choice in ["JPEG", "JPG", "WEBP"]:
            img.save(img_io, format=format_choice, quality=quality, optimize=True)
        else:  # PNG
            img.save(img_io, format=format_choice, optimize=True)

        img_size_kb = len(img_io.getvalue()) / 1024  # Convert bytes to KB

        # Stop if the size is close to the target (±5% margin)
        if target_size_kb * 0.95 <= img_size_kb <= target_size_kb * 1.05:
            break  

        # Reduce quality if still too large
        if img_size_kb > target_size_kb:
            quality -= 5  
            if quality < 20:  # If quality is too low, reduce resolution
                width = int(width * 0.9)  # Scale down width
                height = int(height * 0.9)  # Scale down height
                img = img.resize((width, height), Image.LANCZOS)

        iteration += 1  # Prevent infinite loops

    img_io.seek(0)
    return img_io

@app.route("/resize", methods=["POST"])
def resize_image():
    if "image" not in request.files:
        return {"error": "No image uploaded"}, 400

    image = request.files["image"]
    target_size_kb = int(request.form.get("size_kb", 100))
    format_choice = request.form.get("format", "JPEG").upper()

    allowed_formats = ["PNG", "JPG", "JPEG", "WEBP"]
    if format_choice not in allowed_formats:
        return {"error": "Invalid format choice"}, 400

    img = Image.open(image).convert("RGB")  # Convert to RGB to prevent mode issues
    resized_img = resize_to_target_size(img, target_size_kb, format_choice)

    return send_file(resized_img, mimetype=f"image/{format_choice.lower()}", as_attachment=True, download_name=f"resized.{format_choice.lower()}")

if __name__ == "__main__":
    app.run(debug=True)
