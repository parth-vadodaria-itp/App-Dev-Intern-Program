export let formatTime = (time) => {
    let hrs=Math.max(Math.floor(time/3600),0);
    let mins=Math.max(Math.floor((time%3600)/60),0);
    let sec=Math.max((time%3600)%60,0);

    return String(hrs).padStart(2,"0")+":"+String(mins).padStart(2,"0")+":"+String(sec).padStart(2,"0");
}