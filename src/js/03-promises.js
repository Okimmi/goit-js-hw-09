import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
const formsItemsRef = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

formRef.addEventListener('submit', event => {
  event.preventDefault();
  for (let i = 0; i < formsItemsRef.amount.value; i += 1) {
    createPromise(
      i + 1,
      Number(formsItemsRef.delay.value) + i * Number(formsItemsRef.step.value)
    )
      .then(value => {
        Notify.success(value);
      })
      .catch(err => {
        Notify.failure(err);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        rej(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
