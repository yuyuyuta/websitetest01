let rule = 90; // ルール番号
let speed = 5; // アニメーションの速度 (1-10)
const width = 100; // セルの数
let cells = new Array(width); // セルの状態を格納する配列

// 初期状態の設定
for (let i = 0; i < width; i++) {
  cells[i] = 0;
}
cells[Math.floor(width / 2)] = 1; // 中央のセルを1にする

// ルールに基づいて状態を更新する関数
function update() {
  let next = new Array(width); // 次の状態を格納する配列

  // 各セルの状態を更新する
  for (let i = 0; i < width; i++) {
    let left = i == 0 ? cells[width - 1] : cells[i - 1]; // 左隣の状態
    let right = i == width - 1 ? cells[0] : cells[i + 1]; // 右隣の状態
    let index = left * 4 + cells[i] * 2 + right; // 3ビットの数値に変換
    let nextCell = (rule >> index) & 1; // ルールに従って次の状態を決定
    next[i] = nextCell;
  }

  cells = next; // 状態を更新する
}

// 状態を描画する関数
function draw() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let cellWidth = canvas.width / width;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  for (let i = 0; i < width; i++) {
    if (cells[i] == 1) {
      ctx.fillRect(i * cellWidth, 0, cellWidth, canvas.height);
    }
  }
}

// 状態を更新して描画する関数
function tick() {
  update();
  draw();
}

// ルール番号を変更する関数
function setRule() {
  rule = parseInt(document.getElementById("rule").value);
}

// アニメーションの速度を変更する関数
function setSpeed() {
  speed = parseInt(document.getElementById("speed").value);
}

setInterval(tick, 1000 / speed); // 速度に応じてアニメーションの速度を調整する
document.getElementById("rule").addEventListener("change", setRule); // ルール番号の変更を監視する
document.getElementById("speed").addEventListener("change", setSpeed); // アニメーションの速度の変更を監視する