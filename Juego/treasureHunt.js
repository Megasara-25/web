document.addEventListener('DOMContentLoaded', function() {
    // Puzzle code
    const puzzle = document.getElementById('puzzle');
    const pieces = [];
    const size = 4;
    const imgSrc = 'foto.jpg';

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const piece = document.createElement('div');
            piece.classList.add('piece');
            piece.style.backgroundImage = `url(${imgSrc})`;
            piece.style.backgroundPosition = `-${j * 100}px -${i * 100}px`;
            piece.setAttribute('data-position', `${i}-${j}`);
            piece.draggable = true;
            piece.addEventListener('dragstart', dragStart);
            piece.addEventListener('dragover', dragOver);
            piece.addEventListener('drop', drop);
            puzzle.appendChild(piece);
            pieces.push(piece);
        }
    }

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.position);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const draggedPos = e.dataTransfer.getData('text/plain');
        const targetPos = e.target.dataset.position;

        const draggedPiece = pieces.find(piece => piece.dataset.position === draggedPos);
        const targetPiece = pieces.find(piece => piece.dataset.position === targetPos);

        if (draggedPiece && targetPiece) {
            const draggedStyle = draggedPiece.style.cssText;
            draggedPiece.style.cssText = targetPiece.style.cssText;
            targetPiece.style.cssText = draggedStyle;
        }
    }

    window.shuffle = function() {
        pieces.forEach(piece => {
            const randomIndex = Math.floor(Math.random() * pieces.length);
            const randomPiece = pieces[randomIndex];
            const tempStyle = piece.style.cssText;
            piece.style.cssText = randomPiece.style.cssText;
            randomPiece.style.cssText = tempStyle;
        });
    };

    // Maze code
    const maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    
    const mazeContainer = document.getElementById('maze');
    const player = document.getElementById('player');
    const cellSize = 40;
    const startX = 1;
    const startY = 1;
    const endX = 8;
    const endY = 7;
    let playerX = startX;
    let playerY = startY;
    
    function createMaze() {
        maze.forEach((row, y) => {
            row.forEach((cell, x) => {
                const div = document.createElement('div');
                div.classList.add('maze-cell');
                if (cell === 1) {
                    div.classList.add('wall');
                } else {
                    div.classList.add('path');
                }
                if (x === startX && y === startY) {
                    div.classList.add('start');
                } else if (x === endX && y === endY) {
                    div.classList.add('end');
                }
                mazeContainer.appendChild(div);
            });
        });
    }
    
    function movePlayer(x, y) {
        if (maze[y][x] === 0) {
            playerX = x;
            playerY = y;
            player.style.top = `${y * cellSize}px`;
            player.style.left = `${x * cellSize}px`;
            
            if (x === endX && y === endY) {
                alert('¡Has ganado!');
            }
        }
    }
    
    function handleKeyPress(e) {
        switch (e.key) {
            case 'ArrowUp':
                movePlayer(playerX, playerY - 1);
                break;
            case 'ArrowDown':
                movePlayer(playerX, playerY + 1);
                break;
            case 'ArrowLeft':
                movePlayer(playerX - 1, playerY);
                break;
            case 'ArrowRight':
                movePlayer(playerX + 1, playerY);
                break;
        }
    }
    
    document.addEventListener('keydown', handleKeyPress);
    createMaze();
    movePlayer(startX, startY);

    // Treasure Hunt code
    const treasureHuntContainer = document.getElementById('treasure-hunt');
    const treasureGridSize = 4;
    let treasureFound = false;

    function createTreasureHunt() {
        const treasureX = Math.floor(Math.random() * treasureGridSize);
        const treasureY = Math.floor(Math.random() * treasureGridSize);

        for (let y = 0; y < treasureGridSize; y++) {
            for (let x = 0; x < treasureGridSize; x++) {
                const cell = document.createElement('div');
                cell.classList.add('treasure-cell');
                cell.dataset.x = x;
                cell.dataset.y = y;
                cell.addEventListener('click', () => checkForTreasure(x, y, treasureX, treasureY));
                treasureHuntContainer.appendChild(cell);
            }
        }
    }

    function checkForTreasure(x, y, treasureX, treasureY) {
        if (treasureFound) return;
        
        if (x == treasureX && y == treasureY) {
            document.querySelector(`.treasure-cell[data-x="${x}"][data-y="${y}"]`).classList.add('treasure');
            alert('¡Encontraste el tesoro!');
            treasureFound = true;
        } else {
            alert('No hay nada aquí. Sigue buscando.');
        }
    }

    createTreasureHunt();
});
