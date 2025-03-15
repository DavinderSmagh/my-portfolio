document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    const scoreDisplay = document.getElementById("score");
    const width = 8;
    const candies = ["red", "yellow", "green", "blue", "purple", "orange"];
    let squares = [];
    let score = 0;

    // Create the Board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement("div");
            square.setAttribute("id", i);
            let randomColor = candies[Math.floor(Math.random() * candies.length)];
            square.style.backgroundColor = randomColor;
            square.classList.add("candy");
            square.setAttribute("draggable", true);
            grid.appendChild(square);
            squares.push(square);
        }
    }

    createBoard();

    let draggedElement, replacedElement;

    function dragStart() {
        draggedElement = this;
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragDrop() {
        replacedElement = this;
    }

    function dragEnd() {
        if (!draggedElement || !replacedElement) return;

        let draggedId = parseInt(draggedElement.id);
        let replacedId = parseInt(replacedElement.id);

        const validMoves = [
            draggedId - 1, draggedId + 1,
            draggedId - width, draggedId + width
        ];

        if (validMoves.includes(replacedId)) {
            // Swap colors instead of class names
            let tempColor = draggedElement.style.backgroundColor;
            draggedElement.style.backgroundColor = replacedElement.style.backgroundColor;
            replacedElement.style.backgroundColor = tempColor;

            checkMatches();
        }
    }

    function checkMatches() {
        let matched = false;

        // Check for horizontal matches
        for (let i = 0; i < width * width; i++) {
            if (i % width > width - 3) continue;
            let row = [i, i + 1, i + 2];
            let color = squares[i].style.backgroundColor;

            if (row.every(index => squares[index].style.backgroundColor === color && color !== "")) {
                row.forEach(index => squares[index].style.backgroundColor = "");
                matched = true;
                score += 10;
            }
        }

        // Check for vertical matches
        for (let i = 0; i < width * (width - 2); i++) {
            let column = [i, i + width, i + 2 * width];
            let color = squares[i].style.backgroundColor;

            if (column.every(index => squares[index].style.backgroundColor === color && color !== "")) {
                column.forEach(index => squares[index].style.backgroundColor = "");
                matched = true;
                score += 10;
            }
        }

        scoreDisplay.textContent = score;
        if (matched) {
            setTimeout(() => {
                moveDown();
                refillBoard();
            }, 200);
        }
    }

    function moveDown() {
        for (let i = width * (width - 1); i >= 0; i--) {
            if (squares[i].style.backgroundColor === "") {
                let above = i - width;
                if (above >= 0) {
                    squares[i].style.backgroundColor = squares[above].style.backgroundColor;
                    squares[above].style.backgroundColor = "";
                }
            }
        }
    }

    function refillBoard() {
        for (let i = 0; i < width; i++) {
            if (squares[i].style.backgroundColor === "") {
                let newColor = candies[Math.floor(Math.random() * candies.length)];
                squares[i].style.backgroundColor = newColor;
            }
        }
    }

    squares.forEach(square => {
        square.addEventListener("dragstart", dragStart);
        square.addEventListener("dragover", dragOver);
        square.addEventListener("drop", dragDrop);
        square.addEventListener("dragend", dragEnd);
    });

    setInterval(() => {
        checkMatches();
        moveDown();
        refillBoard();
    }, 1000);
});
