let score = 0;
let total = 0;

let questionCount = 0;
const maxQuestions = 10;

const scoreElement =
document.getElementById("score");

const wordElement =
document.getElementById("word");

const optionButtons =
document.querySelectorAll(".optionBtn");

const result =
document.getElementById("result");

let words = [];

let currentIndex = 0;
let correctAnswer = "";

// ======================
// 載入 CSV
// ======================

async function loadCSV() {

    try {

        const response =
        await fetch("words.csv");

        if (!response.ok) {

            throw new Error(
                "找不到 words.csv"
            );

        }

        const text =
        await response.text();

        const lines =
        text.trim().split("\n");

        lines.shift();

        words = lines.map(line => {

            const [word, meaning] =
            line.split(",");

            return {
                word: word.trim(),
                meaning: meaning.trim()
            };

        });

        shuffleWords();

        loadWord();

    } catch (error) {

        console.error(error);

        result.textContent =
        "❌ CSV 載入失敗";

    }

}

// ======================
// 打亂題目
// ======================

function shuffleWords() {

    for (
        let i = words.length - 1;
        i > 0;
        i--
    ) {

        const j =
        Math.floor(
            Math.random() * (i + 1)
        );

        [words[i], words[j]] =
        [words[j], words[i]];

    }

}

// ======================
// 產生選項
// ======================

function generateQuestion() {

    correctAnswer =
    words[currentIndex].meaning;

    let options =
    [correctAnswer];

    while (options.length < 4) {

        const randomIndex =
        Math.floor(
            Math.random() *
            words.length
        );

        const randomMeaning =
        words[randomIndex].meaning;

        if (
            !options.includes(
                randomMeaning
            )
        ) {

            options.push(
                randomMeaning
            );

        }

    }

    options.sort(
        () => Math.random() - 0.5
    );

    optionButtons.forEach(
        (button, index) => {

            button.textContent =
            options[index];

            button.disabled =
            false;

        }
    );

}

// ======================
// 載入題目
// ======================

function loadWord() {

    if (
        currentIndex >= words.length
    ) {

        showResultScreen();
        return;

    }

    wordElement.textContent =
    words[currentIndex].word;

    result.textContent = "";

    generateQuestion();

}

// ======================
// 播放動畫
// ======================

function playAnimation(type) {

    const card =
    document.querySelector(".card");

    card.classList.remove(
        "correct-animation",
        "wrong-animation"
    );

    void card.offsetWidth;

    card.classList.add(type);

}

// ======================
// 答題
// ======================

optionButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            optionButtons.forEach(
                btn => {

                    btn.disabled =
                    true;

                }
            );

            total++;
            questionCount++;

            if (
                button.textContent ===
                correctAnswer
            ) {

                score++;

                result.textContent =
                "✅ Correct!";

                playAnimation(
                    "correct-animation"
                );

            } else {

                result.textContent =
                `❌ Wrong!`;

                playAnimation(
                    "wrong-animation"
                );

            }

            scoreElement.textContent =
            `Score: ${score} / ${total}`;

            setTimeout(() => {

                if (
                    questionCount >=
                    maxQuestions
                ) {

                    showResultScreen();
                    return;

                }

                currentIndex++;

                loadWord();

            }, 1200);

        }
    );

});

// ======================
// 結算畫面
// ======================

function showResultScreen() {

    const percentage =
    Math.round(
        score /
        maxQuestions *
        100
    );

    let grade = "C";

    if (percentage >= 90) {

        grade = "S";

    } else if (
        percentage >= 80
    ) {

        grade = "A";

    } else if (
        percentage >= 70
    ) {

        grade = "B";

    }

    document.querySelector(
        ".card"
    ).innerHTML = `

        <h2>🎉 測驗完成</h2>

        <h1>${percentage}%</h1>

        <h2>🏆 Rank ${grade}</h2>

        <p>答對：${score}</p>

        <p>答錯：${maxQuestions - score}</p>

        <button onclick="restartQuiz()">
            再挑戰一次
        </button>

    `;

}

// ======================
// 重新開始
// ======================

function restartQuiz() {

    location.reload();

}

// ======================
// 啟動
// ======================

loadCSV();
