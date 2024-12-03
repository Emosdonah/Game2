const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 設置畫布大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 遊戲變數
let player = {
  x: 50,
  y: canvas.height - 150,
  width: 50,
  height: 50,
  speed: 5,
  jumpPower: 15,
  dy: 0,
  gravity: 1,
  onGround: false,
  img: new Image(),
};
player.img.src = "character.png"; // 替換為你的角色圖片路徑

let background = new Image();
background.src = "background.png"; // 替換為你的背景圖片路徑

// 鍵盤輸入
let keys = {};

// 地面
let groundHeight = canvas.height - 100;

// 事件監聽
window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

// 遊戲主循環
function gameLoop() {
  // 清除畫布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 繪製背景
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // 角色邏輯
  if (keys["ArrowRight"]) player.x += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys[" "] && player.onGround) {
    player.dy = -player.jumpPower;
    player.onGround = false;
  }

  // 重力與跳躍
  player.y += player.dy;
  player.dy += player.gravity;

  // 地面檢測
  if (player.y + player.height >= groundHeight) {
    player.y = groundHeight - player.height;
    player.dy = 0;
    player.onGround = true;
  }

  // 繪製角色
  ctx.drawImage(player.img, player.x, player.y, player.width, player.height);

  // 繪製地面
  ctx.fillStyle = "green";
  ctx.fillRect(0, groundHeight, canvas.width, canvas.height - groundHeight);

  requestAnimationFrame(gameLoop);
}

// 啟動遊戲
gameLoop();