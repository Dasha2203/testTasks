//const form
const form = document.getElementById('form-email');
const inputEmail = document.querySelector('.email__input')
const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    

// const modal
const modal = document.getElementById('subscribe-modal');
const modalTitle = modal.querySelector('.modal__title');
const modalParagraph = modal.querySelector('.modal__paragraph');

// timer
const dayBlock = document.querySelector('.timer__number--days span');
const hoursBlock = document.querySelector('.timer__number--hours span');
const minutesBlock = document.querySelector('.timer__number--minutes span');
const secondsBlock = document.querySelector('.timer__number--seconds span');

let dayCaption = document.querySelector('.timer__number--days .timer__number--type');
let hoursCaption = document.querySelector('.timer__number--hours .timer__number--type');
let minutesCaption = document.querySelector('.timer__number--minutes .timer__number--type');
let secondsCaption = document.querySelector('.timer__number--seconds .timer__number--type');
let shortNameTime = false

const fromDate = new Date(2022, 10, 30, 10, 8, 6);
const toDate = new Date('2022-12-31');

timer();

//rename caption time 
window.onload = () => setNumberName();
window.addEventListener('resize', setNumberName);

//remove class error
inputEmail.addEventListener('input', deleteInputClassError)

//submit form
form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (!inputEmail.value.trim().match(pattern)) {
        inputEmail.classList.add('email__input--error')
        return;
    }

    sendData();
});

// I didn't understand where to send it, so I used jsonplaceholder
const sendData = async () => {

    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
              title: 'New post with email',
              body: inputEmail.value,
              userId: 1,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })

        let post = await response.json();

        generateTextModal(true)
        modal.classList.add('modal--show');
        
        console.log(post);

    } catch (err) {
        generateTextModal(false)
    }
}

//Email validity check
function validateEmail(value) {
    return EMAIL_REGEXP.test(value);
}

//remove error class
function deleteInputClassError() {
    inputEmail.classList.remove('email__input--error')
}

//hide modal
const closeModal = () => {
    modal.classList.remove('modal--show');
}

const generateTextModal = (result) => {
    if (result) {
        modalTitle.textContent = 'SUCCESS!'
        modalParagraph.textContent = 'You have successfully subscribed to the email newsletter'
    } else {
        modalTitle.textContent = 'fail!'
        modalParagraph.textContent = 'You have fail subscribed to the email newsletter'
    }
}

function timer() {
    //If we count from the current date, else - false
    let currentDate = true;

    setInterval(() => {
        let timeData = getTime(currentDate);
        setTime(timeData);
    }, 1000); 
   
}

// get the difference between the dates
const getTime = ( current = true) => {

    let selectedDate = current ? new Date() : fromDate;

    const days = parseInt((toDate - selectedDate) / (1000 * 60 * 60 * 24));
    const hours = parseInt(Math.abs(toDate - selectedDate) / (1000 * 60 * 60) % 24);
    const minutes = parseInt(Math.abs(toDate.getTime() - selectedDate.getTime()) / (1000 * 60) % 60);
    const seconds = parseInt(Math.abs(toDate.getTime() - selectedDate.getTime()) / (1000) % 60); 

    if (!current) fromDate.setSeconds(fromDate.getSeconds() + 1);

    return {days , hours, minutes, seconds};
}

function setTime ({days , hours, minutes, seconds}) {
    if (!arguments.length) return;

    dayBlock.textContent = `${days}`;
    hoursBlock.textContent = checkNumber(hours);
    minutesBlock.textContent = checkNumber(minutes);
    secondsBlock.textContent = checkNumber(seconds);
}

function setNumberName() {
    console.log('executed')
    if (window.innerWidth <= 1024 && !shortNameTime) {
        
        dayCaption.textContent = 'DD';
        hoursCaption.textContent = 'HH';
        minutesCaption.textContent = 'MM';
        secondsCaption.textContent = 'SS';
    }

    if (window.innerWidth > 1024 && shortNameTime) {

        dayCaption.textContent = 'Days';
        hoursCaption.textContent = 'Hours';
        minutesCaption.textContent = 'Minutes';
        secondsCaption.textContent = 'Seconds';

    }

    shortNameTime = !shortNameTime;
    
}

function checkNumber(number) {
    if (number < 10) return `0${number}`
    return `${number}`
}
