<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Games</title>
    <style>
        body {
            font-family: 'Comic Sans MS', cursive, sans-serif;
            background-color: #ffefd5;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: 20px;
            width: 80%;
            max-width: 600px;
        }
        h1 {
            color: #ff6347;
        }
        .clue {
            margin-bottom: 15px;
        }
        .clue h2 {
            margin: 0 0 10px 0;
            color: #4682b4;
        }
        .clue p {
            margin: 0;
            color: #6a5acd;
        }
        .clue input {
            margin-top: 10px;
            padding: 5px;
            width: calc(100% - 12px);
            box-sizing: border-box;
            border: 2px solid #6a5acd;
            border-radius: 5px;
        }
        .clue button {
            margin-top: 10px;
            padding: 5px 10px;
            background-color: #ff6347;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .clue button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        #puzzle {
            width: 400px;
            height: 400px;
            display: flex;
            flex-wrap: wrap;
            border: 2px solid #000;
            margin-bottom: 20px;
        }
        .piece {
            width: 100px;
            height: 100px;
            box-sizing: border-box;
            border: 1px solid #fff;
            background-size: 400px 400px;
        }
        #maze {
            width: 400px;
            height: 400px;
            position: relative;
            border: 2px solid #000;
            background-color: #fff;
            margin-top: 20px;
        }
        .maze-cell {
            width: 40px;
            height: 40px;
            box-sizing: border-box;
            float: left;
        }
        .wall {
            background-color: #000;
        }
        .path {
            background-color: #fff;
        }
        .start {
            background-color: #0f0;
        }
        .end {
            background-color: #f00;
        }
        #player {
            width: 40px;
            height: 40px;
            background-color: #00f;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
        }
        #reward {
            display: none;
            text-align: center;
            margin-top: 20px;
        }
        #reward h2 {
            color: #ff6347;
        }
        #heart {
            width: 100px;
            height: 90px;
            position: relative;
            background: #ff69b4;
            margin: 0 auto;
            transform: rotate(-45deg);
        }
        #heart::before,
        #heart::after {
            content: "";
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: #ff69b4;
            position: absolute;
        }
        #heart::before {
            top: -50px;
            left: 0;
        }
        #heart::after {
            top: 0;
            left: 50px;
        }
    </style>
</head>
<body>
    <div class="container treasure-hunt">
        <h1>Búsqueda del Tesoro</h1>

        <div class="clue" id="clue1">
            <h2>Pista 1</h2>
            <p>Encuentra la respuesta a 2 + 2</p>
            <input type="text" id="answer1" placeholder="Escribe tu respuesta aquí">
            <button onclick="checkAnswer(1, 4)">Verificar</button>
        </div>

        <div class="clue" id="clue2" style="display: none;">
            <h2>Pista 2</h2>
            <p>¿Cuál es la capital de Francia?</p>
            <input type="text" id="answer2" placeholder="Escribe tu respuesta aquí">
            <button onclick="checkAnswer(2, 'paris')">Verificar</button>
        </div>

        <div class="clue" id="clue3" style="display: none;">
            <h2>Pista 3</h2>
            <p>¿Cuántos continentes hay en el mundo?</p>
            <input type="text" id="answer3" placeholder="Escribe tu respuesta aquí">
            <button onclick="checkAnswer(3, 7)">Verificar</button>
        </div>

        <div class="clue" id="clue4" style="display: none;">
            <h2>Pista 4</h2>
            <p>Has encontrado el tesoro.</p>
            <div id="reward">
                
                <div id="heart"></div>
            </div>
        </div>
    </div>

    <div class="container">
        <h1>Rompecabezas</h1>
        <div id="puzzle"></div>
        <button onclick="shuffle()">Mezclar</button>
    </div>
    
    <div class="container">
        <h1>Laberinto</h1>
        <div id="maze">
            <div id="player"></div>
        </div>
    </div>

    <script>
        function checkAnswer(clueNumber, correctAnswer) {
            const answer = document.getElementById(`answer${clueNumber}`).value.toLowerCase().trim();
            if (answer == correctAnswer) {
                document.getElementById(`clue${clueNumber}`).style.display = 'none';
                const nextClueNumber = clueNumber + 1;
                if (document.getElementById(`clue${nextClueNumber}`)) {
                    document.getElementById(`clue${nextClueNumber}`).style.display = 'block';
                }
                if (clueNumber === 3) {
                    document.getElementById('reward').style.display = 'block';
                }
            } else {
                alert('Respuesta incorrecta. Intenta de nuevo.');
            }
        }

        // Rompecabezas
        const puzzle = document.getElementById('puzzle');
        const pieceCount = 16;
        const image = 'pinguino.jpg';
        
        for (let i = 0; i < pieceCount; i++) {
            const piece = document.createElement('div');
            piece.classList.add('piece');
            piece.style.backgroundImage = `url(${image})`;
            piece.style.backgroundPosition = `${(i % 4) * -100}px ${Math.floor(i / 4) * -100}px`;
            puzzle.appendChild(piece);
        }

        function shuffle() {
            for (let i = puzzle.children.length; i >= 0; i--) {
                puzzle.appendChild(puzzle.children[Math.random() * i | 0]);
            }
        }

        // Laberinto
        const maze = [
            's111111111',
            '0010000001',
            '1010101101',
            '1000100001',
            '1110111011',
            '1000000001',
            '1110111111',
            '1000000001',
            '1011111101',
            '100000000e'
        ];

        const mazeContainer = document.getElementById('maze');
        let player = document.getElementById('player');
        let playerPosition = { x: 0, y: 0 };

        for (let row = 0; row < maze.length; row++) {
            for (let col = 0; col < maze[row].length; col++) {
                const cell = document.createElement('div');
                cell.classList.add('maze-cell');
                if (maze[row][col] === '1') cell.classList.add('wall');
                if (maze[row][col] === '0') cell.classList.add('path');
                if (maze[row][col] === 's') cell.classList.add('start');
                if (maze[row][col] === 'e') cell.classList.add('end');
                mazeContainer.appendChild(cell);
            }
        }

        window.addEventListener('keydown', movePlayer);
        function movePlayer(event) {
            const key = event.key;
            const { x, y } = playerPosition;
            let newX = x;
            let newY = y;

            if (key === 'ArrowUp') newY--;
            if (key === 'ArrowDown') newY++;
            if (key === 'ArrowLeft') newX--;
            if (key === 'ArrowRight') newX++;

            if (newX >= 0 && newY >= 0 && newX < 10 && newY < 10 && maze[newY][newX] !== '1') {
                playerPosition = { x: newX, y: newY };
                player.style.top = `${newY * 40}px`;
                player.style.left = `${newX * 40}px`;
                if (maze[newY][newX] === 'e') alert('¡Has ganado!');
            }
        }
    </script>
</body>
</html>
