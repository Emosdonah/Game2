window.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    let characterX = 100;
    let characterY = 300;
    let isJumping = false;

    let obstacles = [
        { x: 400, y: 300, width: 50, height: 50 },
        { x: 600, y: 250, width: 50, height: 50 }
    ];

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'green';
        ctx.fillRect(characterX, characterY, 50, 50);

        ctx.fillStyle = 'gray';
        obstacles.forEach(obstacle => {
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }

    let moveLeftInterval;
    let moveRightInterval;

    document.getElementById('moveLeft').addEventListener('touchstart', function() {
        moveLeftInterval = setInterval(() => {
            characterX -= 2;
            if (characterX < 0) characterX = 0;
            draw();
        }, 30);
    });

    document.getElementById('moveLeft').addEventListener('touchend', function() {
        clearInterval(moveLeftInterval);
    });

    document.getElementById('moveRight').addEventListener('touchstart', function() {
        moveRightInterval = setInterval(() => {
            characterX += 2;
            if (characterX > canvas.width - 50) characterX = canvas.width - 50;
            draw();
        }, 30);
    });

    document.getElementById('moveRight').addEventListener('touchend', function() {
        clearInterval(moveRightInterval);
    });

    document.getElementById('jump').addEventListener('touchstart', function() {
        if (!isJumping) {
            isJumping = true;
            let jumpHeight = 0;
            const jumpInterval = setInterval(() => {
                if (jumpHeight < 100) {
                    characterY -= 5;
                    jumpHeight += 5;
                } else {
                    clearInterval(jumpInterval);
                    const fallInterval = setInterval(() => {
                        if (characterY < 300) {
                            characterY += 5;
                        } else {
                            characterY = 300;
                            clearInterval(fallInterval);
                            isJumping = false;
                        }
                        draw();
                    }, 30);
                }
                draw();
            }, 30);
        }
    });

    function checkCollision() {
        obstacles.forEach(obstacle => {
            if (
                characterX < obstacle.x + obstacle.width &&
                characterX + 50 > obstacle.x &&
                characterY < obstacle.y + obstacle.height &&
                characterY + 50 > obstacle.y
            ) {
                alert('Game Over! Collision detected.');
                resetGame();
            }
        });
    }

    function resetGame() {
        characterX = 100;
        characterY = 300;
        draw();
    }

    setInterval(() => {
        checkCollision();
    }, 50);

    draw();
};