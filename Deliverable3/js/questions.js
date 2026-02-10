const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which HTML tag is used to define a paragraph?",
    options: ["<p>", "<para>", "<paragraph>", "<text>"],
    answer: "<p>"
  },
  {
    question: "Which tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: "<a>"
  },
  {
    question: "Which HTML attribute specifies an alternate text for an image?",
    options: ["title", "alt", "src", "longdesc"],
    answer: "alt"
  },
  {
    question: "Which tag is used to insert an image?",
    options: ["<image>", "<img>", "<pic>", "<src>"],
    answer: "<img>"
  },
  {
    question: "Which tag is used to create an ordered list?",
    options: ["<ul>", "<ol>", "<li>", "<list>"],
    answer: "<ol>"
  },
  {
    question: "Which tag is used to create a table row?",
    options: ["<td>", "<th>", "<tr>", "<row>"],
    answer: "<tr>"
  },
  {
    question: "Which HTML tag is used to define the largest heading?",
    options: ["<h6>", "<heading>", "<h1>", "<head>"],
    answer: "<h1>"
  },
  {
    question: "Which attribute is used to uniquely identify an HTML element?",
    options: ["class", "name", "id", "key"],
    answer: "id"
  },
  {
    question: "Which tag is used to group block-level elements?",
    options: ["<span>", "<group>", "<div>", "<section>"],
    answer: "<div>"
  },
  {
    question: "Which tag is used to group inline elements?",
    options: ["<div>", "<inline>", "<span>", "<group>"],
    answer: "<span>"
  },
  {
    question: "Which HTML tag defines a line break?",
    options: ["<lb>", "<break>", "<br>", "<newline>"],
    answer: "<br>"
  },
  {
    question: "Which tag is used to create a checkbox?",
    options: [
      "<input type='check'>",
      "<checkbox>",
      "<input type='checkbox'>",
      "<check>"
    ],
    answer: "<input type='checkbox'>"
  },
  {
    question: "Which HTML element is used for semantic navigation links?",
    options: ["<menu>", "<nav>", "<navigation>", "<links>"],
    answer: "<nav>"
  },
  {
    question: "Which tag is used to define the document body?",
    options: ["<content>", "<main>", "<body>", "<page>"],
    answer: "<body>"
  },
  {
    question: "Which attribute is required in the <img> tag?",
    options: ["alt", "src", "title", "width"],
    answer: "src"
  },
  {
    question: "Which HTML tag is used to define a form?",
    options: ["<input>", "<form>", "<fieldset>", "<submit>"],
    answer: "<form>"
  },
  {
    question: "Which tag represents emphasized text?",
    options: ["<bold>", "<strong>", "<i>", "<em>"],
    answer: "<em>"
  },
  {
    question: "Which HTML tag defines a table header cell?",
    options: ["<td>", "<tr>", "<th>", "<thead>"],
    answer: "<th>"
  },
  {
    question: "Which tag is used to include JavaScript in HTML?",
    options: ["<js>", "<javascript>", "<script>", "<code>"],
    answer: "<script>"
  }
];

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

function updateSelectedOption(selectedAnswers){
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

function navigateToQuestion(qno, selectedAnswers){
    // Modify the next button to submit on final question.
    document.getElementById("next").textContent=qno===questions.length-1?"Submit":"Next";
    if(qno===0) document.getElementById("previous").style.visibility="hidden";
    else document.getElementById("previous").style.visibility="visible";

    // Render the expected question number.
    loadQuestion(qno);

    // Render the previously selected answer.
    if(qno<selectedAnswers.length) renderSelection(selectedAnswers[qno]);

    // Render the answered-cnt meter.
    renderAnsweredCntMeter(selectedAnswers);
}

function renderAnsweredCntMeter(selectedAnswers){
    let meter=document.getElementById("answered-cnt-meter");

    let answeredCnt=0;
    if(selectedAnswers!==null){
        for(let j=0;j<selectedAnswers.length;j++){
           if(selectedAnswers[j]!=null) answeredCnt++;
        }
    }

    meter.value=answeredCnt;
}

function renderTimer(){
    let timeLeft=sessionStorage.getItem("timeLeft") || sessionStorage.getItem("totalTime");
    timeLeft--;
    if(timeLeft<0) return false;
    sessionStorage.setItem("timeLeft",timeLeft);

    let hrs=Math.max(Math.floor(timeLeft%3600),0);
    let mins=Math.max(Math.floor((timeLeft%3600)/60),0);
    let sec=Math.max((timeLeft%3600)%60,0);

    let timer=document.getElementById("remaining-time");
    
    // Change color of timer to red showing that around 80% of time is exhausted.
    let last20Percent=sessionStorage.getItem("totalTime")*20/100;
    if(timeLeft<(Math.min(sessionStorage.getItem("totalTime"),Math.max(60,last20Percent))) && !timer.className.includes("text-red-600")) timer.className=timer.className+" text-red-600";
    let timeLeftDisplay=String(hrs).padStart(2,"0")+":"+String(mins).padStart(2,"0")+":"+String(sec).padStart(2,"0");

    timer.textContent=timeLeftDisplay;
    return true;
}

function calculateResult(selectedAnswers){
  let correctCnt=0;
  for(let j=0;j<questions.length;j++){
    if(selectedAnswers[j]!==null && selectedAnswers[j]==questions[j].answer) correctCnt++;
  }
  sessionStorage.setItem("correctCnt",correctCnt);
}

function showResult(){
  clearInterval(timerSchedule);
  calculateResult(selectedAnswers);
  location.replace("results.html");
}

// Items from session-storage.
let qno=sessionStorage.getItem("qno") || 0;
let selectedAnswers=JSON.parse(sessionStorage.getItem("selected")) || [];
let totalTime=25*60;
sessionStorage.setItem("totalTime",totalTime);

// render the timer.
renderTimer();

/* Initial-visit/reload settings*/
navigateToQuestion(qno,selectedAnswers);


/* Event Listeners for Previous and Next buttons.*/
document.getElementById("previous").addEventListener("click",(event) => {
    let selectedAnswers=JSON.parse(sessionStorage.getItem("selected")) || [];

    // Store the marked answer.
    updateSelectedOption(selectedAnswers);

    // Updating the question number, store and render the previous question.
    qno=Math.max(qno-1,0);
    sessionStorage.setItem("qno",qno);
    navigateToQuestion(qno,selectedAnswers);
});

document.getElementById("next").addEventListener("click",(event) => {
    let selectedAnswers=JSON.parse(sessionStorage.getItem("selected")) || [];

    // Store the marked answer.
    updateSelectedOption(selectedAnswers);

    // Updating the question number, store and render the next question.
    qno=Math.min(qno+1,questions.length);
    sessionStorage.setItem("qno",qno);
    if(qno==20) showResult();
    else navigateToQuestion(qno,selectedAnswers);
});


/* Event Listener for Time */
let timerSchedule=setInterval(
  () => {
    if(!renderTimer()) showResult();
  }
, 1000);