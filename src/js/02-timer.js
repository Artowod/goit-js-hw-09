/* Задание 2 - таймер обратного отсчета
Выполняй это задание в файлах 02-timer.html и 02-timer.js. 
Напиши скрипт таймера, который ведёт обратный отсчет 
до определенной даты. Такой таймер может использоваться в 
блогах и интернет-магазинах, страницах регистрации событий, 
во время технического обслуживания и т. д. 
Посмотри демо видео работы таймера. */

// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const datetimePicker = document.querySelector('#datetime-picker');
startBtn.disabled = true;
stopBtn.disabled = true;
let selectedDate = 0;

const options = {
  enableTime: true, //Enables time picker
  time_24hr: false, //Displays time picker in 24 hour mode without AM/PM selection when enabled.
  defaultDate: new Date(),
  minuteIncrement: 1, //Adjusts the step for the minute input (incl. scrolling)
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      startBtn.disabled = true;
      window.alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      console.log('Target time: ', selectedDates[0]);
      selectedDate = selectedDates[0];
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = function (value) {
  return `${value}`.padStart(2, '0');
};

const showTime = function (time = options.defaultDate) {
  const { days, hours, minutes, seconds } = convertMs(time);
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
};

let timeLoopId = null;
let clockCount;

const timeLoop = function () {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  datetimePicker.disabled = true;
  clockCount = selectedDate - options.defaultDate;
  timeLoopId = setInterval(time => {
    showTime((clockCount -= 1000));
    if (Math.floor(clockCount / 1000) === 0) clearInterval(timeLoopId);
  }, 1000);
};

const handleStartBtn = () => {
  timeLoop();
};

const eventStartBtn = startBtn.addEventListener('click', handleStartBtn);
const eventStopBtn = stopBtn.addEventListener('click', e => {
  stopBtn.disabled = true;
  datetimePicker.disabled = false;
  clearInterval(timeLoopId);
});
const fp = flatpickr('#datetime-picker', options);
