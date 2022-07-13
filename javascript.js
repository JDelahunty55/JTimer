 // -----------------------------------

  // Scramble Functions


function generateScramble() {
    const movesArr = ["R", "U", "F", "L", "D", "B"];
    const variationsArr = ["", "'", "2"]

    let scramble = [];
    let randNum = 0;

    while (scramble.length < 20) {
        randNum = Math.floor(Math.random() * 6);

        if (scramble.length == 0 || scramble[scramble.length - 1] != randNum) {
            scramble.push(randNum);
        }

    }

    for (i = 0; i < scramble.length; i++) {
        randNum = Math.floor(Math.random() * 3);
        scramble[i] = movesArr[scramble[i]] + variationsArr[randNum];
    }

    console.log(scramble);
    return scramble.join(" ");

}

function setScramble() {
    let scramble = generateScramble();
    document.getElementById("scramble").innerHTML = scramble;
}


$( document ).ready(function() {
    setScramble();
});

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
    setScramble();
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
