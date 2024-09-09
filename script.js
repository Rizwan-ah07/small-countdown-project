function countdownTo7PM() {
    const now = new Date();
    const target = new Date();


    target.setHours(18, 15, 0, 0); 


    if (now.getTime() >= target.getTime()) {
        clearInterval(timerInterval);  
        document.getElementById('message').innerHTML = "The results are out!";
        document.getElementById('timer').style.display = "none";  
        return;
    }


    const difference = target.getTime() - now.getTime();


    let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((difference / (1000 * 60)) % 60);
    let seconds = Math.floor((difference / 1000) % 60);


    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;


    document.getElementById('hours').innerHTML = hours;
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;

    document.getElementById('message').innerHTML = "This much time left until you get the results:";
}


const timerInterval = setInterval(countdownTo7PM, 1000);
