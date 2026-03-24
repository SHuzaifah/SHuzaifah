const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const themeToggle = document.querySelector('.theme-toggle');

let timer;
let timerSeconds = 25 * 60;
let activeSeconds = timerSeconds;
let running = false;

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-timer');
const resetBtn = document.getElementById('reset-timer');
const chips = document.querySelectorAll('.chip[data-minutes]');

const updateTimer = () => {
  const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
  const secs = String(timerSeconds % 60).padStart(2, '0');
  timerDisplay.textContent = `${mins}:${secs}`;
};

const clearTimer = () => {
  clearInterval(timer);
  running = false;
  startBtn.textContent = 'Start';
};

const startTimer = () => {
  if (running) {
    clearTimer();
    return;
  }

  running = true;
  startBtn.textContent = 'Pause';

  timer = setInterval(() => {
    timerSeconds -= 1;
    updateTimer();

    if (timerSeconds <= 0) {
      clearTimer();
      timerSeconds = activeSeconds;
      updateTimer();
    }
  }, 1000);
};

const resetTimer = () => {
  clearTimer();
  timerSeconds = activeSeconds;
  updateTimer();
};

navItems.forEach((button) => {
  button.addEventListener('click', () => {
    navItems.forEach((item) => item.classList.remove('active'));
    pages.forEach((page) => page.classList.remove('active'));

    button.classList.add('active');
    document
      .querySelector(`.page[data-page="${button.dataset.target}"]`)
      .classList.add('active');
  });
});

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((item) => item.classList.remove('active'));
    chip.classList.add('active');

    activeSeconds = Number(chip.dataset.minutes) * 60;
    timerSeconds = activeSeconds;
    updateTimer();
    clearTimer();
  });
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

updateTimer();
