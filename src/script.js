//index.html

function countdownTo7PM() {
    const now = new Date();
    const target = new Date();

    target.setHours(19, 15, 0, 0); 

    if (now.getTime() >= target.getTime()) {
        clearInterval(timerInterval7pm);  
        document.getElementById('message-7pm').textContent = "The results are out!";
        document.getElementById('timer-7pm').style.display = "none";  
        return;
    }

    const difference = target.getTime() - now.getTime();

    let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((difference / (1000 * 60)) % 60);
    let seconds = Math.floor((difference / 1000) % 60);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    document.getElementById('hours-7pm').textContent = hours;
    document.getElementById('minutes-7pm').textContent = minutes;
    document.getElementById('seconds-7pm').textContent = seconds;

    document.getElementById('message-7pm').textContent = "This much time left until you get the results:";
}

const timerInterval7pm = setInterval(countdownTo7PM, 1000);


//timer.html

let timeInputInteractive = "";
let totalTimeInteractive = 0;
let timeRemainingInteractive = 0;
let timerIntervalInteractive = null;

const timeDisplayInteractive = document.getElementById("timer-interactive");
const progressInteractive = document.getElementById("progress-interactive");


function updateDisplayInteractive() {
    const hours = Math.floor(timeRemainingInteractive / 3600);
    const minutes = Math.floor((timeRemainingInteractive % 3600) / 60);
    const seconds = timeRemainingInteractive % 60;

    document.getElementById("hours-interactive").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes-interactive").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds-interactive").textContent = seconds.toString().padStart(2, '0');
}


function updateProgressBarInteractive() {
    const progressPercent = ((totalTimeInteractive - timeRemainingInteractive) / totalTimeInteractive) * 100;
    progressInteractive.style.width = `${progressPercent}%`;
}


function resetProgressBarInteractive() {
    progressInteractive.style.width = "0%";
}


document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", (e) => {
        timeInputInteractive += e.target.dataset.value;
        timeRemainingInteractive = parseInt(timeInputInteractive, 10);
        totalTimeInteractive = timeRemainingInteractive;


        resetProgressBarInteractive();

        updateDisplayInteractive();
    });
});


document.getElementById("startBtn-interactive").addEventListener("click", () => {
    if (timerIntervalInteractive) return;
    if (timeRemainingInteractive === 0) return;

    timerIntervalInteractive = setInterval(() => {
        if (timeRemainingInteractive > 0) {
            timeRemainingInteractive--;
            updateDisplayInteractive();
            updateProgressBarInteractive();
        } else {
            clearInterval(timerIntervalInteractive);
            timerIntervalInteractive = null;
            alert("Time's up!");
        }
    }, 1000);
});


document.getElementById("pauseBtn-interactive").addEventListener("click", () => {
    clearInterval(timerIntervalInteractive);
    timerIntervalInteractive = null;
});


document.getElementById("resetBtn-interactive").addEventListener("click", () => {
    clearInterval(timerIntervalInteractive);
    timerIntervalInteractive = null;
    timeInputInteractive = "";
    timeRemainingInteractive = 0;
    totalTimeInteractive = 0;


    resetProgressBarInteractive();
    updateDisplayInteractive();
});