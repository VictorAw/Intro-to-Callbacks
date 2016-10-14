class Clock {
  constructor() {
    // Get starting time
    let date = new Date();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();

    this.printTime();

    // Need to bind _tick to this (Clock) otherwise its this is
    // set to setInterval
    setInterval(this._tick.bind(this), 1000);
  }

  _formatTimeUnit(unit) {
    if (unit < 10) {
      return `0${unit}`;
    }
    return `${unit}`;
  }

  printTime() {
    let hours_str = this._formatTimeUnit(this.hours);
    let minutes_str = this._formatTimeUnit(this.minutes);
    let seconds_str = this._formatTimeUnit(this.seconds);

    console.log(hours_str + ":" + minutes_str + ":" + seconds_str);
  }

  _tick() {
    this.seconds += 1
    if (this.seconds == 60) {
      this.seconds = 0;
      this.minutes += 1;
    }

    if (this.minutes == 60) {
      this.minutes = 0;
      this.hours += 1;
    }

    if (this.hours == 24) {
      this.hours = 0;
    }
    this.printTime();
  }
}

// const clock = new Clock();

// const readline = require('readline');
//
// const reader = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Please provide a number: ", (num) => {
      sum += parseInt(num, 10);
      console.log(sum);
      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  } else {
    completionCallback(sum);
    reader.close();
  }
}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

function askIfGreaterThan(el1, el2, callback) {
  reader.question(`Is ${el1} > ${el2}? `, (response) => {
    if (response === "yes") {
      callback(true);
    } else {
      callback(false);
    }
  })
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i < arr.length - 1) {
    askIfGreaterThan(arr[i], arr[i + 1], (isGreaterThan) => {
      if (isGreaterThan) {
        madeAnySwaps = true;
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
      innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
    })
  } else {
    outerBubbleSortLoop(madeAnySwaps);
  }
}

function absurdBubbleSort(arr, completionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      completionCallback(arr);
      reader.close();
    }
  }

  outerBubbleSortLoop(true);
}

// absurdBubbleSort([3, 2, 1], function (arr) {
//   console.log("Sorted array: " + JSON.stringify(arr));
// });

Function.prototype.myBind = function(ctx) {
  return () => { this.apply(ctx) };
}

class Lamp {
  constructor() {
    this.name = "a lamp";
  }
}

const turnOn = function() {
   console.log("Turning on " + this.name);
}

const lamp = new Lamp();

turnOn(); // should not work the way we want it to

const boundTurnOn = turnOn.bind(lamp);
const myBoundTurnOn = turnOn.myBind(lamp);

boundTurnOn(); // should say "Turning on a lamp"
myBoundTurnOn(); // should say "Turning on a lamp"
