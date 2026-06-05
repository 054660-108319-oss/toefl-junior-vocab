let score = 0;
let total = 0;

let questionCount = 0;
const maxQuestions = 10;

const scoreElement =
document.getElementById("score");

const wordElement =
document.getElementById("word");

const nextBtn =
document.getElementById("nextBtn");

const optionButtons =
document.querySelectorAll(".optionBtn");

const result =
document.getElementById("result");

let words = [];

let currentIndex = 0;
let correctAnswer = "";

// =====================
// 載入 CSV
// =====================

async function loadCSV(){

    try{

        const response =
        await fetch("words.csv");

        if(!response.ok){

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

            return{
                word:word.trim(),
                meaning:meaning.trim()
            };

        });

        console.log(words);

        loadWord();

    }catch(error){

        console.error(error);

        result.textContent =
        "❌ CSV 載入失敗";

    }

}

// =====================
// 產生選項
// =====================

function generateQuestion(){

    correctAnswer =
    words[currentIndex].meaning;

    let options =
    [correctAnswer];

    while(options.length < 4){

        const randomIndex =
        Math.floor(
            Math.random()*words.length
        );

        const randomMeaning =
        words[randomIndex].meaning;

        if(
            !options.includes(
                randomMeaning
            )
        ){

            options.push(
                randomMeaning
            );

        }

    }

    options.sort(
        () => Math.random()-0.5
    );

    optionButtons.forEach(
        (button,index)=>{

            button.textContent =
            options[index];

        }
    );

}

// =====================
// 載入單字
// =====================

function loadWord(){

    if(words.length === 0){

        return;

    }

    wordElement.textContent =
    words[currentIndex].word;

    result.textContent = "";

    optionButtons.forEach(btn=>{

        btn.disabled = false;

    });

    generateQuestion();

}

// =====================
// 下一題按鈕
// =====================

nextBtn.addEventListener(
    "click",
    function(){

        currentIndex++;

        if(
            currentIndex >=
            words.length
        ){

            currentIndex = 0;

        }

        loadWord();

    }
);

// =====================
// 答題
// =====================

optionButtons.forEach(button=>{

    button.addEventListener(
        "click",
        function(){

            const card =
            document.querySelector(
                ".card"
            );

            card.classList.remove(
                "correct-animation",
                "wrong-animation"
            );

            total++;
            questionCount++;

            if(
                button.textContent
                ===
                correctAnswer
            ){

                score++;

                result.textContent =
                "✅ Correct!";

                card.classList.add(
                    "correct-animation"
                );

            }else{

                result.textContent =
                `❌ Wrong!`;

                card.classList.add(
                    "wrong-animation"
                );

            }

            scoreElement.textContent =
            `Score: ${score} / ${total}`;

            optionButtons.forEach(
                btn=>{

                    btn.disabled =
                    true;

                }
            );

            setTimeout(()=>{

                if(
                    questionCount
                    >=
                    maxQuestions
                ){

                    showResultScreen();

                }else{

                    currentIndex++;

                    if(
                        currentIndex
                        >=
                        words.length
                    ){

                        currentIndex = 0;

                    }

                    loadWord();

                }

            },800);

        }
    );

});

// =====================
// 結算頁
// =====================

function showResultScreen(){

    const percentage =
    Math.round(
        score /
        maxQuestions *
        100
    );

    document.querySelector(
        ".card"
    ).innerHTML = `

        <h2>🎉 測驗完成</h2>

        <h1>${percentage}%</h1>

        <p>答對：${score}</p>

        <p>答錯：${maxQuestions-score}</p>

        <button onclick="restartQuiz()">
            再挑戰一次
        </button>

    `;

}

// =====================
// 重來
// =====================

function restartQuiz(){

    location.reload();

}

// =====================
// 啟動
// =====================

loadCSV();
