let history = [];

function draw() {
    const nums = [];
    while (nums.length < 6) {
        const n =Math.floor(Math.random() * 43) + 1;
        if (!nums.includes(n))nums.push(n);
    }

    const box = document.getElementById("numbers");
    box.innerHTML = "";

    nums.forEach(n => {
        const div = document.createElement("div");
        div.className = "ball"
        div.textContent = n;
        box.appendChild(div);
        div.style.background = getBallColor(n);
        animateBall(div);
    });

    history.push(nums.join(", "));
}

function downloadHistory(){
    const text = history.join("/n");
    const blob = new Blob([text], {type: "text/plain"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "numbers.txt";
    a.click();
    URL.revokeObjectURL(url);
}

function animateBall(ball) {
    ball.style.animation = 'none';
    void ball.offsetwidth;
    ball.style.animation = '';
}

function getBallColor(n){
    if (n <= 7) return "#f7d348";
    if (n <= 14) return "#4a90e2";
    if (n <= 21) return "#e94f4f";
    if (n <= 28) return "#4caf50";
    if (n <= 35) return "#333";
    return "#9b59b6";
}
