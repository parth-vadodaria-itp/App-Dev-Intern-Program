import { questions, totalTime } from "../data/quizData.js";
import { calculateResult, decideFinalVerdict, percentScore } from "../services/resultService.js";
import { formatTime } from "../utils/generalUtils.js";

let selectedAns=JSON.parse(sessionStorage.getItem("selected")) || [];
let correctCnt=calculateResult(questions, selectedAns);
let percentageScore=renderPercentScore(correctCnt,questions.length);
renderTimeTaken();
renderCorrectAnswers(correctCnt);
renderFinalVerdict(percentageScore);

// Event Listners for Reattempt and Home buttons.
document.getElementById("reattempt").addEventListener("click", () => {
    sessionStorage.clear();
    location.replace("questions.html");
});
document.getElementById("home").addEventListener("click", () => {
    sessionStorage.clear();
    location.replace("index.html");
});

function renderTimeTaken(){
    let timeLeft=sessionStorage.getItem("timeLeft");
    let span=document.createElement("span");

    if(totalTime===null || timeLeft===null){
        span.textContent="-- : -- : --"
    }
    else{
        let timeTaken=totalTime-timeLeft;
        span.textContent=formatTime(timeTaken);
    }
    document.getElementById("time-taken").appendChild(span);
}
function renderPercentScore(correctCnt){
    // Calculate the percent-score.
    let percentageScore=percentScore(correctCnt, questions.length);

    // Decide the style of percent-score meter based on passing criteria (here 70%).
    let style;
    if(percentageScore<70) style=`bg-[conic-gradient(#FF0000_${percentageScore}%,_#e5e7eb_0%)]`;
    else style=`bg-[conic-gradient(#22c55e_${percentageScore}%,_#e5e7eb_0%)]`
    
    // Apply style.
    document.querySelector("#percent-score>div").className=document.querySelector("#percent-score>div").className.replace(/bg-\[conic-gradient\(.*?\)\]/g,style);

    // Display the percent-score.
    if(percentageScore!==null) document.querySelector("#percent-score>div>h1").textContent=percentageScore+"%";
    else document.querySelector("#percent-score>div>h1").textContent="--%";

    return percentageScore;
}

function renderCorrectAnswers(correctCnt){
    let span=document.createElement("span");
    if(correctCnt!==null) span.textContent=`${correctCnt} / ${questions.length}`;
    else span.textContent="-- / --";
    document.getElementById("correct-cnt").appendChild(span);
}

function renderFinalVerdict(percentageScore){
    let span=document.createElement("span");
    let decision=decideFinalVerdict(percentageScore);
    span.className=decision.txtColor;
    span.textContent=decision.verdict;
    document.getElementById("final-verdict").appendChild(span);
}