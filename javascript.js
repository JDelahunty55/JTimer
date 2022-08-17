// -----------------------------------

// Data Functions 

const timesArr = [];
var timesCount = timesArr.length + 1;
let bestSingle = 999999999;
let bestMo3 = 999999999;
let bestAo5 = 999999999;
let bestAo12 = 999999999;
let bestAo100 = 999999999;

function time(num, currentTime, currentScramble, currentDate) {
    this.numId = num;
    this.solveTime = currentTime;
    this.scramble = currentScramble;
    this.date = currentDate;
}

function getTime() {
    let minutes = document.getElementById("minutes").innerHTML;
    let seconds = document.getElementById("seconds").innerHTML;
    let milliseconds = document.getElementById("milliseconds").innerHTML;

    return (minutes + ":" + seconds + "." + milliseconds);
}

function saveTime() {
    const newTime = new time();

    newTime.numId = timesCount;
    timesCount ++;
    newTime.solveTime = getTime();
    newTime.scramble = document.getElementById("scramble").innerHTML;
    newTime.date = new Date();

    timesArr.push(newTime);
    console.log(newTime);
}

function convertToMS(timeFormat) {
    let arr = timeFormat.replace(":",".").split(".").map(Number);
    let numFormat = 0;
    console.log(arr);

    numFormat = (arr[0] * 60000) + (arr[1] * 1000) + arr[2];

    return numFormat;
}

function convertFromMS(milliseconds) {
    let seconds = 0;
    let minutes = 0;

    while (milliseconds >= 1000) {
        milliseconds -= 1000;
        seconds += 1;
    }

    while (seconds >= 60) {
        seconds -= 60;
        minutes += 1;
    }

    milliseconds /= 10;

    if (milliseconds < 10) {
        milliseconds = "0" + milliseconds;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return (minutes + ":" + seconds + "." + Math.round(milliseconds));
}

function getAverages() {
    getSingle();
    getmo3();
    getao5();
    getao12();
    getao100();
}

function getSingle() {
    document.getElementById("currentSingle").innerHTML = timesArr[timesArr.length - 1].solveTime;
    if (convertToMS(timesArr[timesArr.length - 1].solveTime) < bestSingle) {
        document.getElementById("bestSingle").innerHTML = timesArr[timesArr.length - 1].solveTime;
        bestSingle = convertToMS(timesArr[timesArr.length - 1].solveTime);
    }
}

function getmo3() {
    let mo3 = "0:00.00";
    total = 0;

    if (timesArr.length >= 3) {
        for (let i = timesArr.length; i > timesArr.length - 3; i--) {
            thisTime = timesArr[i - 1].solveTime;
            total += convertToMS(thisTime);
        }

        if ((total / 3) < bestMo3) {
            document.getElementById("bestMo3").innerHTML = convertFromMS(total / 3);
            bestMo3 = (total / 3);
        }
        mo3 = convertFromMS(total / 3);    
    }

    document.getElementById("currentMo3").innerHTML = mo3;
}

function getao5() {
    let ao5 = "0:00.00";
    let total = 0;
    let lowest = 999999999;
    let highest = 0;

    if (timesArr.length >= 5) {
        for (let i = timesArr.length; i > timesArr.length - 5; i--) {
            thisTime = convertToMS(timesArr[i - 1].solveTime);
            total += thisTime;
            if (thisTime > highest) {
                highest = thisTime;
            }
            if (thisTime < lowest) {
                lowest = thisTime;
            }
        }

        total -= highest;
        total -= lowest;

        if ((total / 3) < bestAo5) {
            document.getElementById("bestAo5").innerHTML = convertFromMS(total / 3);
            bestAo5 = (total / 3);
        }

        ao5 = convertFromMS(total / 3);   
    }

    document.getElementById("currentAo5").innerHTML = ao5;
}

function getao12() {
    let ao12 = "0:00.00";
    let total = 0;
    let lowest = 999999999;
    let highest = 0;

    if (timesArr.length >= 12) {
        for (let i = timesArr.length; i > timesArr.length - 12; i--) {
            thisTime = convertToMS(timesArr[i - 1].solveTime);
            total += thisTime;
            if (thisTime > highest) {
                highest = thisTime;
            }
            if (thisTime < lowest) {
                lowest = thisTime;
            }
        }

        total -= highest;
        total -= lowest;

        if ((total / 10) < bestAo12) {
            document.getElementById("bestAo12").innerHTML = convertFromMS(total / 10);
            bestAo12 = (total / 10);
        }

        ao12 = convertFromMS(total / 10);    
    }

    document.getElementById("currentAo12").innerHTML = ao12;
}

function getao100() {
    let ao100 = "0:00.00";
    let total = 0;
    let lowest = 999999999;
    let highest = 0;

    if (timesArr.length >= 100) {
        for (let i = timesArr.length; i > timesArr.length - 100; i--) {
            thisTime = convertToMS(timesArr[i - 1].solveTime);
            total += thisTime;
            if (thisTime > highest) {
                highest = thisTime;
            }
            if (thisTime < lowest) {
                lowest = thisTime;
            }
        }

        total -= highest;
        total -= lowest;

        if ((total / 98) < bestAo100) {
            document.getElementById("bestAo100").innerHTML = convertFromMS(total / 98);
            bestAo100 = (total / 98);
        }

        ao100 = convertFromMS(total / 98);    
    }

    document.getElementById("currentAo100").innerHTML = ao100;
}


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
    saveTime();
    getAverages();
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

    document.getElementById("minutes").innerHTML = minutes;

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