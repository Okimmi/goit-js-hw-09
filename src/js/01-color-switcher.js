const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');

startBtnRef.addEventListener('click', onStartBtnClick);
stopBtnRef.disabled = true;

let colorSwitch = null;

function onStartBtnClick() {
  colorSwitch = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);

  startBtnRef.removeEventListener('click', onStartBtnClick);
  stopBtnRef.addEventListener('click', onStopBtnClick);
  startBtnRef.disabled = true;
  stopBtnRef.disabled = false;
}

function onStopBtnClick() {
  clearInterval(colorSwitch);

  stopBtnRef.removeEventListener('click', onStopBtnClick);
  startBtnRef.addEventListener('click', onStartBtnClick);
  startBtnRef.disabled = false;
  stopBtnRef.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
