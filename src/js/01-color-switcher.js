function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let clockId = null;
const handleStarBtn = startBtn.addEventListener('click', e => {
  startBtn.disabled = true;
  clockId = setInterval(param => {
    document.querySelector('body').style.backgroundColor = getRandomHexColor();
  }, 1000);
});
const handleStopBtn = stopBtn.addEventListener('click', e => {
  clearInterval(clockId);
  startBtn.disabled = false;
});
