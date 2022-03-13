//const form
const form = document.getElementById('form-email');
const inputEmail = document.querySelector('.email__input')
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

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

const toDate = new Date('2022-12-31');

timer();

window.addEventListener('onload', (e) => {
    if (e.currentTarget.innerWidth <= 1024 && !shortNameTime) {
        
        dayCaption.textContent = 'DD';
        hoursCaption.textContent = 'HH';
        minutesCaption.textContent = 'MM';
        secondsCaption.textContent = 'SS';
    }
    if (e.currentTarget.innerWidth > 1024 && shortNameTime) {
        dayCaption.textContent = 'Days';
        hoursCaption.textContent = 'Hours';
        minutesCaption.textContent = 'Minutes';
        secondsCaption.textContent = 'Seconds';
    }
    shortNameTime = !shortNameTime;
})

window.addEventListener('resize', (e) => {
    if (e.currentTarget.innerWidth <= 1024 && !shortNameTime) {
        
        dayCaption.textContent = 'DD';
        hoursCaption.textContent = 'HH';
        minutesCaption.textContent = 'MM';
        secondsCaption.textContent = 'SS';
    }
    if (e.currentTarget.innerWidth > 1024 && shortNameTime) {
        dayCaption.textContent = 'Days';
        hoursCaption.textContent = 'Hours';
        minutesCaption.textContent = 'Minutes';
        secondsCaption.textContent = 'Seconds';
    }
    shortNameTime = !shortNameTime;
});

//submit form
form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (!validateEmail(inputEmail.value)) {
        inputEmail.classList.add('email__input--error')
        return;
    }

    sendData();
});

inputEmail.addEventListener('input', deleteInputClassError)

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

function timer () {
    setInterval(getTime, 1000); 
}

function getTime () {
    let nowDate = new Date();
    const days = parseInt((toDate - nowDate) / (1000 * 60 * 60 * 24));
    const hours = parseInt(Math.abs(toDate - nowDate) / (1000 * 60 * 60) % 24);
    const minutes = parseInt(Math.abs(toDate.getTime() - nowDate.getTime()) / (1000 * 60) % 60);
    const seconds = parseInt(Math.abs(toDate.getTime() - nowDate.getTime()) / (1000) % 60); 
    dayBlock.textContent = `${days}`;
    hoursBlock.textContent = checkNumber(hours);
    minutesBlock.textContent = checkNumber(minutes);
    secondsBlock.textContent = checkNumber(seconds);
}

const checkNumber = (number) => {
    if (number < 10) return `0${number}`
    return `${number}`
}

const resizeWindow = () => {

}
