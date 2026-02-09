function renderTimeTaken(){
    let totalTime=sessionStorage.getItem("totalTime");
    let timeLeft=sessionStorage.getItem("timeLeft");
    let span=document.createElement("span");

    if(totalTime===null || timeLeft===null){
        span.textContent="-- : -- : --"
    }
    else{
        let timeTaken=totalTime-timeLeft;

        let sec=timeTaken%60;
        let mins=Math.max(Math.floor(timeTaken/60),0);
        let hrs=Math.max(Math.floor(mins/60,0));

        span.textContent=String(hrs).padStart(2,"0")+" : "+String(mins).padStart(2,"0")+" : "+String(sec).padStart(2,"0");
    }
    document.getElementById("time-taken").appendChild(span);
}
function renderPercentScore(correctAns=0, totalQuestions){
    // Calculate the percent-score.
    let percentScore=totalQuestions!==null?Number.parseFloat((correctAns*100)/totalQuestions).toFixed(2):null;

    // Decide the style of percent-score meter based on passing criteria (here 70%).
    let style;
    if(percentScore<70) style=`bg-[conic-gradient(#FF0000_${percentScore}%,_#e5e7eb_0%)]`;
    else style=`bg-[conic-gradient(#22c55e_${percentScore}%,_#e5e7eb_0%)]`
    
    // Apply style.
    document.querySelector("#percent-score>div").className=document.querySelector("#percent-score>div").className.replace(/bg-\[conic-gradient\(.*?\)\]/g,style);

    // Display the percent-score.
    if(percentScore!==null) document.querySelector("#percent-score>div>h1").textContent=percentScore+"%";
    else document.querySelector("#percent-score>div>h1").textContent="--%";

    return percentScore;
}

function renderCorrectAnswers(correctAns=0,totalQuestions){
    let span=document.createElement("span");
    if(totalQuestions!==null) span.textContent=`${correctAns} / ${totalQuestions}`;
    else span.textContent="-- / --";
    document.getElementById("correct-cnt").appendChild(span);
}

function renderFinalVerdict(percentScore){
    let span=document.createElement("span");
    if(percentScore===null) span.textContent="Not Attempted Yet";
    else if(percentScore<70){
        span.className="text-red-600";
        span.textContent="Needs Improvement";
    }
    else if(percentScore<85){
        span.className="text-green-700";
        span.textContent="Good";
    }
    else{
        span.className="text-green-700";
        span.textContent="Excellent";
    }
    document.getElementById("final-verdict").appendChild(span);
}

let correctAns=sessionStorage.getItem("correctCnt") || 0;
let selectedAns=JSON.parse(sessionStorage.getItem("selected"));
let totalQuestions=selectedAns!==null?selectedAns.length:null;
let percentScore=renderPercentScore(correctAns,totalQuestions);
renderTimeTaken();
renderCorrectAnswers(correctAns,totalQuestions);
renderFinalVerdict(percentScore);

// Event Listners for Reattempt and Home buttons.
document.getElementById("reattempt").addEventListener("click", () => {
    sessionStorage.clear();
    location.replace("questions.html");
});
document.getElementById("home").addEventListener("click", () => {
    sessionStorage.clear();
    location.replace("index.html");
});