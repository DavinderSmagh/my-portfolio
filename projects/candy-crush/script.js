document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    const scoreDisplay = document.getElementById("score");
    const width = 8;
    const candies = ["red", "yellow", "green", "blue", "purple", "orange"];
    let squares = [];
    let score = 0;
    let draggedElement, replacedElement;

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement("div");
            square.setAttribute("id", i);
            let randomColor = candies[Math.floor(Math.random() * candies.length)];
            square.classList.add("candy", randomColor);
            grid.appendChild(square);
            squares.push(square);
        }
    }

    createBoard();

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

        const validMoves = [draggedId - 1, draggedId + 1, draggedId - width, draggedId + width];

        if (validMoves.includes(replacedId)) {
            let tempClass = draggedElement.className;
            draggedElement.className = replacedElement.className;
            replacedElement.className = tempClass;
            checkMatches();
        }
    }

    function checkMatches() {
        let matched = false;

        // Horizontal matches
        for (let i = 0; i < width * width; i++) {
            if (i % width > width - 3) continue;
            let row = [i, i + 1, i + 2];
            let color = squares[i].classList[1];

            if (row.every(index => squares[index].classList[1] === color && color !== undefined)) {
                row.forEach(index => squares[index].className = "candy");
                matched = true;
                score += 10;
            }
        }

        // Vertical matches
        for (let i = 0; i < width * (width - 2); i++) {
            let column = [i, i + width, i + 2 * width];
            let color = squares[i].classList[1];

            if (column.every(index => squares[index].classList[1] === color && color !== undefined)) {
                column.forEach(index => squares[index].className = "candy");
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
            if (squares[i].classList.length === 1) {
                let above = i - width;
                if (above >= 0) {
                    squares[i].className = squares[above].className;
                    squares[above].className = "candy";
                }
            }
        }
    }

    function refillBoard() {
        for (let i = 0; i < width; i++) {
            if (squares[i].classList.length === 1) {
                let newColor = candies[Math.floor(Math.random() * candies.length)];
                squares[i].classList.add(newColor);
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
