window.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // 角色的初始位置
    let characterX = 100;
    let characterY = 300;
    let isJumping = false;

    // 障礙物的設置
    let obstacles = [
        { x: 400, y: 300, width: 50, height: 50 }, // 障礙物1
        { x: 600, y: 250, width: 50, height: 50 }  // 障礙物2
    ];

    // 畫出遊戲畫面
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 繪製背景
        ctx.fillStyle = '#87CEEB'; // 藍色背景
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 繪製角色
        ctx.fillStyle = 'green'; // 綠色角色
        ctx.fillRect(characterX, characterY, 50, 50);

        // 繪製障礙物
        ctx.fillStyle = 'gray'; // 灰色障礙物
        obstacles.forEach(obstacleItem => {
            ctx.fillRect(obstacleItem.x, obstacleItem.y, obstacleItem.width, obstacleItem.height);
        });
    }

    // 角色移動的按鈕事件
    let moveLeftInterval;
    let moveRightInterval;

    document.getElementById('moveLeft').addEventListener('mousedown', function() {
        moveLeftInterval = setInterval(() => {
            characterX -= 2; // 向左移動
            if (characterX < 0) characterX = 0; // 防止角色移出畫布
            draw();
        }, 30);
    });

    document.getElementById('moveLeft').addEventListener('mouseup', function() {
        clearInterval(moveLeftInterval);
    });

    document.getElementById('moveRight').addEventListener('mousedown', function() {
        moveRightInterval = setInterval(() => {
            characterX += 2; // 向右移動
            if (characterX > canvas.width - 50) characterX = canvas.width - 50; // 防止角色移出畫布
            draw();
        }, 30);
    });

    document.getElementById('moveRight').addEventListener('mouseup', function() {
        clearInterval(moveRightInterval);
    });

    document.getElementById('jump').addEventListener('click', function() {
        if (!isJumping) {
            isJumping = true;
            let jumpHeight = 0;
            const jumpInterval = setInterval(() => {
                if (jumpHeight < 100) {
                    characterY -= 5; // 向上移動
                    jumpHeight += 5;
                } else {
                    clearInterval(jumpInterval);
                    const fallInterval = setInterval(() => {
                        if (characterY < 300) {
                            characterY += 5; // 向下移動
                        } else {
                            characterY = 300; // 確保角色回到地面
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

    // 監測角色是否與障礙物碰撞
    function checkCollision() {
        obstacles.forEach(obstacleItem => {
            if (
                characterX < obstacleItem.x + obstacleItem.width &&
                characterX + 50 > obstacleItem.x &&
                characterY < obstacleItem.y + obstacleItem.height &&
                characterY + 50 > obstacleItem.y
            ) {
                alert('Game Over! Collision detected.');
                resetGame();
            }
        });
    }

    // 重置遊戲
    function resetGame() {
        characterX = 100;
        characterY = 300;
        draw();
    }

    // 遊戲循環
    setInterval(() => {
        checkCollision();
    }, 50);

    // 初始化遊戲畫面
    draw();
};