let score = 0;
let total = 0;

const scoreElement =
document.getElementById("score");

let words = [];

let currentIndex = 0;
let correctAnswer = "";

const wordElement =
document.getElementById("word");

const nextBtn =
document.getElementById("nextBtn");

const optionButtons =
document.querySelectorAll(".optionBtn");

const result =
document.getElementById("result");

function generateQuestion(){

    correctAnswer =
    words[currentIndex].meaning;

    let options = [correctAnswer];

    while(options.length < 4){

        const randomIndex =
        Math.floor(Math.random() * words.length);

        const randomMeaning =
        words[randomIndex].meaning;

        if(!options.includes(randomMeaning)){
            options.push(randomMeaning);
        }
    }

    options.sort(() => Math.random() - 0.5);

    optionButtons.forEach((button,index)=>{

        button.textContent =
        options[index];

    });
}

function loadWord(){

    wordElement.textContent =
    words[currentIndex].word;

    result.textContent = "";

    generateQuestion();
}

nextBtn.addEventListener(
    "click",
    function(){

        currentIndex++;

        if(currentIndex >= words.length){
            currentIndex = 0;
        }

        loadWord();

    }
);

optionButtons.forEach(button => {

    button.addEventListener(
        "click",
        function(){

            total++;

            if(button.textContent === correctAnswer){

                score++;

                result.textContent =
                "✅ Correct!";

            }else{

                result.textContent =
                "❌ Wrong!";

            }

            scoreElement.textContent =
            `Score: ${score} / ${total}`;

        }
    );

});

async function loadCSV(){

    const response =
    await fetch("words.csv");

    const text =
    await response.text();

    const lines =
    text.trim().split("\n");

    lines.shift();

    words = lines.map(line => {

        const [word, meaning] =
        line.split(",");

        return {
            word,
            meaning
        };

    });


loadCSV();
