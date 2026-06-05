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

    loadWord();

}
);

loadWord();
