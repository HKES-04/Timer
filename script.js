"use strict";

// Elements
const start = document.querySelector(".start");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const ring = document.querySelector(".ring");
const settings = document.querySelector(".settings");
const input = document.querySelectorAll('input[type="text"]');
const img = document.querySelector('img[alt="Settings"]');
const reset = document.querySelector(".reset");

// Takes the value of minutes and seconds and turns them into seconds
let totalTime =
  Number(minutes.querySelector("input").value) * 60 +
  Number(seconds.querySelector("input").value);

// Displays the minutes & seconds and counts down until the timer reaches 0
function countDown() {
  const min = String(Math.trunc(totalTime / 60)).padStart(2, 0);
  const sec = String(totalTime % 60).padStart(2, 0);

  minutes.querySelector("input").value = min;
  seconds.querySelector("input").value = sec;

  if (totalTime === 0) {
    ring.classList.add("ending");
    reset.removeAttribute("disabled");
    start.style.display = "none";
  } else {
    totalTime--;
  }
}

// Allows the user to start and stop the timer
let isRunning = false;
let intervalId;

start.addEventListener("click", function () {
  if (!isRunning) {
    totalTime =
      Number(minutes.querySelector("input").value) * 60 +
      Number(seconds.querySelector("input").value);

    input.forEach(function (inputVal) {
      inputVal.setAttribute("disabled", "");
    });

    countDown();
    intervalId = setInterval(countDown, 1000);
    start.innerHTML = "stop";
    ring.classList.remove("pause");
  } else {
    clearInterval(intervalId);
    start.innerHTML = "start";
    ring.classList.add("pause");
  }
  isRunning = !isRunning;
});

// Allows the user to chnage the minutes and seconds of the timer
let isChanging = false;

settings.addEventListener("click", function () {
  if (!isChanging) {
    input.forEach(function (inputVal) {
      inputVal.removeAttribute("disabled");
    });

    start.setAttribute("disabled", "");
    img.src = "images/check.svg";
  } else {
    input.forEach(function (inputVal) {
      inputVal.setAttribute("disabled", "");
    });

    start.removeAttribute("disabled");
    img.src = "images/gear.svg";
  }
  isChanging = !isChanging;
});

// Once the timer is over the user has the option to reset the timer
reset.addEventListener("click", function () {
  totalTime = 60;
  ring.classList.remove("ending");
  start.style.display = "inline";
  reset.setAttribute("disabled", "");
  start.innerHTML = "stop";
});
