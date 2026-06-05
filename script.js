const words = [
{
    word:"maintain",
    meaning:"維持；保持"
},
{
    word:"derive",
    meaning:"獲得；源自"
},
{
    word:"significant",
    meaning:"重要的；顯著的"
},
{
    word:"occur",
    meaning:"發生"
},
{
    word:"construct",
    meaning:"建造"
},
{
    word:"increase",
    meaning:"增加"
}
];

let currentIndex = 0;

const wordElement =
document.getElementById("word");

const meaningElement =
document.getElementById("meaning");

const showMeaningBtn =
document.getElementById("showMeaningBtn");

const nextBtn =
document.getElementById("nextBtn");

const optionButtons =
document.querySelectorAll(".optionBtn");

const result =
document.getElementById("result");

function loadWord(){

    wordElement.textContent =
    words[currentIndex].word;

    meaningElement.textContent = "";
}

showMeaningBtn.addEventListener(
"click",
function(){

    meaningElement.textContent =
    words[currentIndex].meaning;

}
);

nextBtn.addEventListener(
"click",
function(){

    currentIndex++;

    if(currentIndex >= words.length){

        currentIndex = 0;
    }

    function loadWord(){

    wordElement.textContent =
    words[currentIndex].word;

    meaningElement.textContent = "";

    optionButtons[0].textContent = "A";
    optionButtons[1].textContent = "B";
    optionButtons[2].textContent = "C";
    optionButtons[3].textContent = "D";
}

function generateQuestion(){

    const correctMeaning =
    words[currentIndex].meaning;

    let options = [correctMeaning];

    while(options.length < 4){

        const randomIndex =
        Math.floor(Math.random()*words.length);

        const randomMeaning =
        words[randomIndex].meaning;

        if(!options.includes(randomMeaning)){

            options.push(randomMeaning);
        }
    }

    options.sort(() => Math.random()-0.5);

    optionButtons.forEach((button,index)=>{

        button.textContent =
        options[index];
    });
}

function loadWord(){

    wordElement.textContent =
    words[currentIndex].word;

    meaningElement.textContent = "";

    generateQuestion();
}
    
}
);
