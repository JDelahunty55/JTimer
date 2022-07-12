// ------------------------------------

// Timer Functions

var minutes;
var seconds;
var milliseconds;

var timing = false;

function resetTime() {
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
}

function startTimer() {
    resetTime();

    timing = true;
    running = setInterval(runTimer, 10);
}

function stopTimer() {
    timing = false;
    clearInterval(running);
}

function runTimer() {
    milliseconds += 10;

    if (milliseconds >= 1000) {
        seconds++
        milliseconds = 0;
    }

    if (seconds >= 60) {
        minutes ++;
        seconds = 0;
    }

    document.getElementById("minutes").innerHTML = 
        (minutes > 9 ? minutes : "0" + minutes);

    document.getElementById("seconds").innerHTML =
        (seconds > 9 ? seconds : "0" + seconds);

    document.getElementById("milliseconds").innerHTML = 
        (milliseconds / 10 > 9 ? milliseconds / 10 : "0" + milliseconds / 10);
}

function checkTimer() {

    if (timing) {
        stopTimer();
    }
    else {
        startTimer();
    }
}

document.addEventListener('keyup', (event) => {
    if (event.code == "Space" ) {
        checkTimer();
    }
  }, false);

  // ------------------------------------