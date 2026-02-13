import { questions,totalTime } from "../data/quizData.js";
import { findAnsweredCnt } from "../services/resultService.js";
import { formatTime } from "../utils/generalUtils.js";


// Items from session-storage.
let qno=sessionStorage.getItem("qno") || 0;
let selectedAnswers=JSON.parse(sessionStorage.getItem("selected")) || [];

// render the timer.
loadTimer();

/* Initial-visit/reload settings*/
navigateToQuestion(qno);


/* Event Listeners for Previous and Next buttons.*/
document.getElementById("previous").addEventListener("click",(event) => {
    // Store the marked answer.
    updateSelectedOption();

    // Updating the question number, store and render the previous question.
    qno=Math.max(Number.parseInt(qno)-1,0);
    sessionStorage.setItem("qno",qno);
    navigateToQuestion(qno);
});

document.getElementById("next").addEventListener("click",(event) => {
    // Store the marked answer.
    updateSelectedOption();

    // Updating the question number, store and render the next question.
    qno=Math.min(Number.parseInt(qno)+1,questions.length);
    sessionStorage.setItem("qno",qno);
    if(qno==20) showResult();
    else navigateToQuestion(qno);
});


/* Event Listener for Time */
let timerSchedule=setInterval(
  () => {
    if(!loadTimer()) {
        updateSelectedOption();
        showResult();
    }
  }
, 1000);

function loadQuestion(){
    // Adding question to its dedicated section.
    let questionContainer=document.getElementById("question");
    questionContainer.textContent=`${parseInt(qno)+1}. ` + questions[qno].question;

    // Adding options to its dedicated section.
    let optionsContainer=document.getElementById("options-container");
    optionsContainer.innerHTML="";

    for(let i=0;i<questions[qno].options.length;i++){

        // Preparing label element.
        let label=document.createElement("label");
        label.className="block w-full cursor-pointer md:ml-2 flex gap-4 wrap-anywhere";

        // Preparing radio type input element.
        let input=document.createElement("input");
        input.type = "radio";
        input.name = "option";
        input.value=questions[qno].options[i];

        // Preparing span element to show option to user.
        let span=document.createElement("span");
        span.textContent=questions[qno].options[i];

        // Setting up label element.
        label.appendChild(input);
        label.appendChild(span);

        optionsContainer.appendChild(document.createElement("li").appendChild(label));
    }
}

function updateSelectedOption(){
    let markedAns=document.querySelector('input[name="option"]:checked');

    // Add answer to storage if not visited else update it.
    if(qno>=selectedAnswers.length) selectedAnswers.push(markedAns===null?null:markedAns.value);
    else selectedAnswers[qno]=markedAns===null?null:markedAns.value;
    sessionStorage.setItem("selected",JSON.stringify(selectedAnswers));
}

function renderSelection(previousSelection){
    if(previousSelection===null) return;

    let radio=document.querySelector(`input[name="option"][value="${previousSelection}"]`);
    radio.checked=true;
}

function navigateToQuestion(qno){
    // Modify the next button to submit on final question.
    document.getElementById("next").textContent=qno===questions.length-1?"Submit":"Next";
    if(qno===0) document.getElementById("previous").style.visibility="hidden";
    else document.getElementById("previous").style.visibility="visible";

    // Render the expected question number.
    loadQuestion(qno);

    // Render the previously selected answer.
    if(qno<selectedAnswers.length) renderSelection(selectedAnswers[qno]);

    // Render the answered-cnt meter.
    renderAnsweredCntMeter();
}

function renderAnsweredCntMeter(){
    let meter=document.getElementById("answered-cnt-meter");
    let answeredCnt=findAnsweredCnt(selectedAnswers);
    meter.value=answeredCnt;
}

function loadTimer(){
    let timeLeft=sessionStorage.getItem("timeLeft") || totalTime;
    timeLeft--;
    if(timeLeft<0) return false;
    sessionStorage.setItem("timeLeft",timeLeft);

    let timer=document.getElementById("remaining-time");
    
    // Change color of timer to red showing that around 80% of time is exhausted.
    let last20Percent=totalTime*20/100;
    if(timeLeft<(Math.min(totalTime,Math.max(60,last20Percent))) && !timer.className.includes("text-red-600")) timer.className=timer.className+" text-red-600";
    let timeLeftDisplay=formatTime(timeLeft);

    timer.textContent=timeLeftDisplay;
    return true;
}

function showResult(){
    clearInterval(timerSchedule);
    while(selectedAnswers.length<questions.length) selectedAnswers.push("null");
    sessionStorage.setItem("selected",JSON.stringify(selectedAnswers));
    location.replace("results.html");
}