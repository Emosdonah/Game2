window.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // 載入背景和角色圖片
    const background = new Image();
    const character = new Image();
    background.src = 'background.jpg'; // 背景圖片的路徑
    character.src = 'character.png';   // 角色圖片的路徑

    let characterX = 100; // 角色的初始 X 坐標
    let characterY = 400; // 角色的初始 Y 坐標
    let isJumping = false;

    // 當背景和角色圖片都加載完成後，繪製畫布
    background.onload = function() {
        character.onload = function() {
            draw();
        };
    };

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空畫布
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // 繪製背景
        ctx.drawImage(character, characterX, characterY, 50, 50); // 繪製角色
    }

    // 監聽「向左」按鈕點擊事件
    document.getElementById('moveLeft').addEventListener('click', function() {
        characterX -= 10; // 向左移動
        draw();
    });

    // 監聽「向右」按鈕點擊事件
    document.getElementById('moveRight').addEventListener('click', function() {
        characterX += 10; // 向右移動
        draw();
    });

    // 監聽「跳躍」按鈕點擊事件
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
                        if (characterY < 400) {
                            characterY += 5; // 向下移動
                        } else {
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
};