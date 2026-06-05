let score = 0;
let total = 0;

const scoreElement = document.getElementById("score");
const wordElement = document.getElementById("word");
const nextBtn = document.getElementById("nextBtn");
const optionButtons = document.querySelectorAll(".optionBtn");
const result = document.getElementById("result");

let words = [];
let currentIndex = 0;
let correctAnswer = "";

// 載入 CSV
async function loadCSV() {

    try {

        const response = await fetch("words.csv");

        if (!response.ok) {
            throw new Error("找不到 words.csv");
        }

        const text = await response.text();

        const lines = text.trim().split("\n");

        lines.shift(); // 移除標題列

        words = lines.map(line => {

            const [word, meaning] = line.split(",");

            return {
                word: word.trim(),
                meaning: meaning.trim()
            };

        });

        console.log("單字庫載入成功：", words);

        loadWord();

    } catch (error) {

        console.error(error);

        result.textContent =
        "❌ words.csv 載入失敗";

    }
}

// 產生題目
function generateQuestion() {

    correctAnswer =
    words[currentIndex].meaning;

    let options = [correctAnswer];

    while (options.length < 4) {

        const randomIndex =
        Math.floor(Math.random() * words.length);

        const randomMeaning =
        words[randomIndex].meaning;

        if (!options.includes(randomMeaning)) {

            options.push(randomMeaning);

        }
    }

    options.sort(() => Math.random() - 0.5);

    optionButtons.forEach((button, index) => {

        button.textContent =
        options[index];

        button.disabled = false;

    });

}

// 載入單字
function loadWord() {

    if (words.length === 0) return;

    wordElement.textContent =
    words[currentIndex].word;

    result.textContent = "";

    generateQuestion();

}

// 下一題
nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= words.length) {

        currentIndex = 0;

    }

    loadWord();

});

// 點選答案
optionButtons.forEach(button => {

    button.addEventListener("click", () => {

        total++;

        if (button.textContent === correctAnswer) {

            score++;

            result.textContent =
            "✅ Correct!";

        } else {

            result.textContent =
            `❌ Wrong! 正確答案：${correctAnswer}`;

        }

        scoreElement.textContent =
        `Score: ${score} / ${total}`;

        // 防止狂點刷分
        optionButtons.forEach(btn => {
            btn.disabled = true;
        });

    });

});

// 啟動
loadCSV();
