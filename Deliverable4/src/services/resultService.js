export let findAnsweredCnt=(selectedAnswers) => {
    if(selectedAnswers===null) return 0;
    let answeredCnt=0;
    for(let j=0;j<selectedAnswers.length;j++){
        if(selectedAnswers[j]!==null) answeredCnt++;
    }
    return answeredCnt;
}

export let calculateResult=(questions, selectedAnswers) => {
    if(selectedAnswers===null || selectedAnswers.length!=questions.length) return null;
    let correctCnt=0;
    for(let j=0;j<questions.length;j++){
        if(selectedAnswers[j]!==null && selectedAnswers[j]==questions[j].answer) correctCnt++;
    }
    return correctCnt;
}

export let percentScore=(correctAns,totalQuestions)=>{
    if(correctAns===null) return null;
    return Number.parseFloat((correctAns*100)/totalQuestions).toFixed(2);
}

export let decideFinalVerdict=(percentageScored) => {
    let txtColor=null, verdict=null;
    if(percentageScored===null) verdict="Not Attempted Yet";
    else if(percentageScored<70){
        txtColor="text-red-600";
        verdict="Needs Improvement";
    }
    else if(percentageScored<85){
        txtColor="text-green-700";
        verdict="Good";
    }
    else{
        txtColor="text-green-700";
        verdict="Excellent";
    }

    return {txtColor,verdict};
}