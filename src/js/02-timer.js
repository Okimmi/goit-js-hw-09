import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnRef = document.querySelector('button[data-start]');
const inputDateRef = document.querySelector('#datetime-picker');
const timerValueRef = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

startBtnRef.disabled = true;
let dateNow = Date.now();
let timeLeft = 0;
let selectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.parse(selectedDates[0]) < dateNow) {
      Notify.failure('Please choose a date in the future');
      startBtnRef.disabled = true;
    } else {
      selectedDate = Date.parse(selectedDates[0]);
      startBtnRef.disabled = false;
    }
  },
};

const fp = flatpickr(inputDateRef, options);

startBtnRef.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  const interval = setInterval(() => {
    dateNow = Date.now();
    timeLeft = selectedDate - dateNow;
    if (timeLeft > 0) {
      const convertTimeLeft = convertMs(timeLeft);
      timerValueRef.days.textContent = convertTimeLeft.days;
      timerValueRef.hours.textContent = convertTimeLeft.hours;
      timerValueRef.minutes.textContent = convertTimeLeft.minutes;
      timerValueRef.seconds.textContent = convertTimeLeft.seconds;
    } else {
      clearInterval(interval);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
