const semicircles = document.querySelectorAll('.semicircle');
const timer = document.querySelector('.timer');
const startButton = document.querySelector('#startButton')

// input
const hr = 0;
const min = 25;
const sec = 0;

const hours = hr * 3600000;
const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = hours + minutes + seconds;


let timerLoop;


startButton.addEventListener('click', function(){
    const startTime = Date.now();
    const futureTime = startTime + setTime;

    clearInterval(timerLoop);
    resetSemicircles();
    
    
    timerLoop = setInterval(function(){
        countDownTimer(futureTime);
    });
    countDownTimer(futureTime);
})

function resetSemicircles() {
    semicircles[0].style.transform = 'rotate(0deg)';
    semicircles[1].style.transform = 'rotate(0deg)';
    semicircles[2].style.display = 'block';
    semicircles[0].style.display = 'block';
    semicircles[1].style.display = 'block';
}




function countDownTimer(futureTime) {
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360;

    //progress indicator
    if (angle > 180) {
        semicircles[2].style.display = 'none';
        semicircles[0].style.transform = 'rotate(180deg)';
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    } else {
        semicircles[2].style.display = 'block';
        semicircles[0].style.transform = `rotate(${angle}deg)`;
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    }


    // timer
    const hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});;
    const mins = Math.floor((remainingTime / (1000 *60)) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});;
    const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});;

    timer.innerHTML = `
    <div>${hrs}</div>
    <div class="colon">:</div>
    <div>${mins}</div>
    <div class="colon">:</div>
    <div>${secs}</div>
    `;


    // end
    if (remainingTime < 0) {
        clearInterval(timerLoop);
        semicircles[0].style.display = 'none';
        semicircles[1].style.display = 'none';
        semicircles[2].style.display = 'none';

        timer.innerHTML = `
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        `;
    }
}
