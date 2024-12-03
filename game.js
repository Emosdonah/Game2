window.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // 设置画布大小
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.8; // 保留底部空间放按钮

    const characterSize = 50;
    const groundLevel = canvas.height - characterSize - 20; // 地面高度
    let characterX = 100;
    let characterY = groundLevel;
    let isJumping = false;

    // 障碍物信息
    let obstacles = [
        { x: 400, y: groundLevel, width: 50, height: 50 },
        { x: 700, y: groundLevel - 50, width: 50, height: 50 }
    ];

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 背景
        ctx.fillStyle = '#87CEEB'; // 蓝色背景
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 地面
        ctx.fillStyle = '#654321'; // 棕色地面
        ctx.fillRect(0, groundLevel + characterSize, canvas.width, 20);

        // 角色
        ctx.fillStyle = 'green'; // 绿色方块角色
        ctx.fillRect(characterX, characterY, characterSize, characterSize);

        // 障碍物
        ctx.fillStyle = 'gray'; // 灰色障碍物
        obstacles.forEach(obstacle => {
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }

    let moveLeftInterval;
    let moveRightInterval;

    document.getElementById('moveLeft').addEventListener('touchstart', function() {
        moveLeftInterval = setInterval(() => {
            characterX -= 10; // 移动速度
            if (characterX < 0) characterX = 0;
            draw();
        }, 20);
    });

    document.getElementById('moveLeft').addEventListener('touchend', function() {
        clearInterval(moveLeftInterval);
    });

    document.getElementById('moveRight').addEventListener('touchstart', function() {
        moveRightInterval = setInterval(() => {
            characterX += 10; // 移动速度
            if (characterX > canvas.width - characterSize) characterX = canvas.width - characterSize;
            draw();
        }, 20);
    });

    document.getElementById('moveRight').addEventListener('touchend', function() {
        clearInterval(moveRightInterval);
    });

    document.getElementById('jump').addEventListener('touchstart', function() {
        if (!isJumping) {
            isJumping = true;
            let jumpHeight = 0;
            const jumpInterval = setInterval(() => {
                if (jumpHeight < 150) {
                    characterY -= 5; // 减慢上升速度
                    jumpHeight += 5;
                } else {
                    clearInterval(jumpInterval);
                    const fallInterval = setInterval(() => {
                        if (characterY < groundLevel) {
                            characterY += 5; // 减慢下降速度
                        } else {
                            characterY = groundLevel;
                            clearInterval(fallInterval);
                            isJumping = false;
                        }
                        draw();
                    }, 20);
                }
                draw();
            }, 20);
        }
    });

    function checkCollision() {
        obstacles.forEach(obstacle => {
            if (
                characterX < obstacle.x + obstacle.width &&
                characterX + characterSize > obstacle.x &&
                characterY < obstacle.y + obstacle.height &&
                characterY + characterSize > obstacle.y
            ) {
                alert('Game Over! Collision detected.');
                resetGame();
            }
        });
    }

    function resetGame() {
        characterX = 100;
        characterY = groundLevel;
        draw();
    }

    setInterval(() => {
        checkCollision();
    }, 50);

    draw();
};