// 遊戲設置
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 遊戲參數
const gravity = 0.5; // 重力值
const groundHeight = canvas.height - 50; // 地面高度

// 載入圖片
const background = new Image();
background.src = "background.png"; // 替換為你的背景圖片文件名
const characterImage = new Image();
characterImage.src = "character.png"; // 替換為你的角色圖片文件名

// 角色對象
const player = {
    x: 50,
    y: groundHeight - 50,
    width: 50, // 預設角色寬度
    height: 50, // 預設角色高度
    speed: 5, // 移動速度
    dy: 0, // 垂直速度
    jumpPower: 10, // 跳躍力量
    onGround: true // 是否在地面
};

// 鍵盤輸入狀態
const keys = {};

// 監聽按鍵事件
window.addEventListener("keydown", function (e) {
    keys[e.key] = true;
});
window.addEventListener("keyup", function (e) {
    keys[e.key] = false;
});

// 更新遊戲邏輯
function update() {
    // 左右移動
    if (keys["ArrowRight"]) {
        player.x += player.speed;
    }
    if (keys["ArrowLeft"]) {
        player.x -= player.speed;
    }

    // 跳躍邏輯
    if (keys[" "] && player.onGround) { // 空格鍵跳躍
        player.dy = -player.jumpPower;
        player.onGround = false;
    }

    // 模擬重力
    player.dy += gravity;
    player.y += player.dy;

    // 防止角色掉出地面
    if (player.y + player.height >= groundHeight) {
        player.y = groundHeight - player.height;
        player.dy = 0;
        player.onGround = true; // 回到地面
    }

    // 防止角色移出畫布
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

// 繪製角色與場景
function draw() {
    // 繪製背景
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // 繪製地面
    ctx.fillStyle = "green";
    ctx.fillRect(0, groundHeight, canvas.width, canvas.height - groundHeight);

    // 繪製角色
    ctx.drawImage(characterImage, player.x, player.y, player.width, player.height);
}

// 遊戲主循環
function gameLoop() {
    update(); // 更新邏輯
    draw(); // 繪製畫面
    requestAnimationFrame(gameLoop); // 下一幀執行
}

// 開始遊戲
gameLoop();
