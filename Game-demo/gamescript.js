const gameBoard = document.getElementById("gameBoard");

// 0 = Wall, 1 = Path, 2 = Player, 3 = Goal
const maze = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 1, 1, 1, 0, 1, 1, 3, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let playerPosition = { x: 1, y: 1 };

// Draw the maze
function drawMaze() {
    gameBoard.innerHTML = "";
    maze.forEach((row, y) => {
        row.forEach((cell, x) => {
            const div = document.createElement("div");
            div.classList.add("tile");
            if (cell === 0) div.classList.add("wall");
            else if (cell === 1) div.classList.add("path");
            else if (cell === 2) div.classList.add("player");
            else if (cell === 3) div.classList.add("goal");
            gameBoard.appendChild(div);
        });
    });
}

// Handle player movement
function movePlayer(dx, dy) {
    let newX = playerPosition.x + dx;
    let newY = playerPosition.y + dy;

    if (maze[newY][newX] !== 0) {
        maze[playerPosition.y][playerPosition.x] = 1;
        playerPosition = { x: newX, y: newY };
        if (maze[newY][newX] === 3) alert("You Win!");
        maze[newY][newX] = 2;
        drawMaze();
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") movePlayer(0, -1);
    else if (event.key === "ArrowDown") movePlayer(0, 1);
    else if (event.key === "ArrowLeft") movePlayer(-1, 0);
    else if (event.key === "ArrowRight") movePlayer(1, 0);
});

drawMaze();

