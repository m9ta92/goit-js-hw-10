// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('input#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const day = document.querySelector('span[data-days]');
const hour = document.querySelector('span[data-hours]');
const minute = document.querySelector('span[data-minutes]');
const second = document.querySelector('span[data-seconds]');

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] >= options.defaultDate) {
      btnStart.disabled = false;

      iziToast.success({
        message: 'Press "Start"!',
      });
    } else {
      btnStart.disabled = true;
      //   window.alert('Please choose a date in the future');

      iziToast.error({
        message: 'Please choose a date in the future !',
      });
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

const addLeadingZero = value => value.toString().padStart(2, '0');

function startTimer() {
  btnStart.disabled = true;
  btnStart.style.background = '#4e75ff';
  btnStart.style.color = '#fff';
  input.disabled = true;
  input.style.background = '#fafafa';
  input.style.border = '1px solid #808080';
  input.style.color = '#808080';

  const timer = setInterval(() => {
    const currentDate = new Date();
    const targetDate = new Date(input.value);
    const timeDiff = targetDate - currentDate;

    const { days, hours, minutes, seconds } = convertMs(timeDiff);

    day.textContent = addLeadingZero(days);
    hour.textContent = addLeadingZero(hours);
    minute.textContent = addLeadingZero(minutes);
    second.textContent = addLeadingZero(seconds);

    const isTimerFinished = [days, hours, minutes, seconds].every(
      value => value === 0
    );

    if (isTimerFinished) {
      clearInterval(timer);
      input.disabled = false;
    }
  }, 1000);
}

flatpickr(input, options);

btnStart.addEventListener('click', startTimer);
