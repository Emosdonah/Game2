<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2D Game</title>
    <style>
        canvas {
            display: block;
            margin: 0 auto;
            background-color: #cce7ff; /* 背景色 */
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="800" height="400"></canvas>
    <button id="moveLeft">Move Left</button>
    <button id="moveRight">Move Right</button>
    <button id="jump">Jump</button>

    <script src="game.js"></script>
</body>
</html>