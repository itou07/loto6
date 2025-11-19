
document.addEventListener("DOMContentLoaded", () => {
  // 履歴を保持する配列
  const historyList = []; 
  let lastNumbers = [];

  // ボール描画
  function renderNumbersTo(element, nums) {
    element.innerHTML = "";
    nums.forEach(n => {
      const div = document.createElement("div");
      div.className = "ball";
      div.textContent = n;
      div.style.background = getBallColor(n);
      element.appendChild(div);
      animateBall(div);
    });
  }

  // 抽選
  document.getElementById("drawBtn").addEventListener("click", () => {
    const nums = [];
    while (nums.length < 6) {
      const n = Math.floor(Math.random() * 43) + 1;
      if (!nums.includes(n)) nums.push(n);
    }
    nums.sort((a, b) => a - b);
    lastNumbers = nums.slice();

    const resultsDiv = document.getElementById("results");
    renderNumbersTo(resultsDiv, nums);
  });

  // 履歴に保存
  document.getElementById("saveBtn").addEventListener("click", () => {
    if (!lastNumbers || lastNumbers.length === 0) {
      alert("先に抽選してください");
      return;
    }
    const line = lastNumbers.join(", ");
    historyList.push(line);

    // 画面の履歴表示を更新
    const historyDiv = document.getElementById("history");
    const entry = document.createElement("div");
    entry.textContent = line;
    historyDiv.appendChild(entry);
  });

  // ダウンロード（履歴全体を1つのテキストファイルとして）
  document.getElementById("downloadBtn").addEventListener("click", () => {
    if (historyList.length === 0) {
      alert("履歴がありません");
      return;
    }
    const text = historyList.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "numbers_history.txt";
    a.click();
    URL.revokeObjectURL(url);
  });

  // アニメーション用ヘルパー
  function animateBall(ball) {
    // リセットしてから再適用する
    ball.style.animation = "none";
    // 強制再描画でリセット
    void ball.offsetWidth;
    ball.style.animation = "";
  }

  // 色分け関数
  function getBallColor(n) {
    if (n <= 7) return "#f7d348";
    if (n <= 14) return "#4a90e2";
    if (n <= 21) return "#e94f4f";
    if (n <= 28) return "#4caf50";
    if (n <= 35) return "#333";
    return "#9b59b6";
  }
});
