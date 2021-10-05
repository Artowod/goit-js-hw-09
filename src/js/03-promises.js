/* В HTML есть разметка формы, в поля которой пользователь будет вводить 
первую задержку в миллисекундах, шаг увеличения задержки для каждого промиса 
после первого и количество промисов которое необходимо создать.

Напиши скрипт, который при сабмите формы вызывает функцию 
createPromise(position, delay) столько раз, сколько ввели в поле amount. 
При каждом вызове передай ей номер создаваемого промиса (position) и 
задержку учитывая введенную пользователем первую задержку (delay) и шаг (step).

Дополни код функции createPromise так, чтобы она возвращала один промис, 
который выполянется или отклоняется через delay времени. 

Значением промиса должен быть объект, в котором будут свойства position и 
delay со значениями одноименных параметров. Используй начальный код функции 
для выбора того, что нужно сделать с промисом - выполнить или отклонить.
 */
import Notiflix from 'notiflix';
//import 'notiflix/dist/notiflix-3.1.0.min.css';

const createPromise = (position, delay) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });

/*
Notiflix.Report.success('Fulfilled promise', '', 'Close');
Notiflix.Report.warning('Rejected promise', '', 'Close'); 
Notiflix.Report.failure('Rejected promise', '', 'Close'); 
*/

const handleSubmitBtn = document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();
  const amount = +event.currentTarget.elements['amount'].value;
  const step = +event.currentTarget.elements['step'].value;
  const delay = +event.currentTarget.elements['delay'].value;
  for (let position = 0; position < amount; position++) {
    createPromise(position + 1, delay + step * position)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
});

//================================================================================
//====================================Example=====================================

// Change value of isSuccess variable to call resolve or reject
/* const isSuccess = true;

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (isSuccess) {
      resolve('Success! Value passed to resolve function');
    } else {
      reject('Error! Error passed to reject function');
    }
  }, 2000);
});

// Will run first
Notiflix.Notify.success('Before promise.then()');

// Registering promise callbacks
promise.then(
  // onResolve will run third or not at all
  value => {
    Notiflix.Notify.success('onResolve call inside promise.then()');
    Notiflix.Notify.success(value); // "Success! Value passed to resolve function"
  },
  // onReject will run third or not at all
  error => {
    Notiflix.Notify.failure('onReject call inside promise.then()');
    Notiflix.Notify.failure(error); // "Error! Error passed to reject function"
  },
);

// Will run second
Notiflix.Notify.success('After promise.then()');

//----------------------example with catch-------------------------
promise
  .then(value => {
    Notiflix.Notify.success(value);
  })
  .catch(error => {
    Notiflix.Notify.failure(error);
  });
 */
//====================================Example=====================================
//================================================================================
