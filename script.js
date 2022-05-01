
const API_ENDPOINT = 'https://icanhazdadjoke.com/';
const XHR = new XMLHttpRequest();
const buttonSelector = document.getElementById('button');
const buttonCtaSelector = document.getElementById('cta');
const loaderSelector = document.getElementById('loader');
const jokeSelector = document.getElementById('joke');
const errorContainerSelector = document.getElementById('error-container');
const errorSelector = document.getElementById('error-message');



function showJoke(joke) {
    setLoaderState(false);
    setButtonState(false);
    jokeSelector.innerHTML = joke
}
function showError(error) {
    setLoaderState(false);
    setButtonState(false);
    errorSelector.innerHTML = error;
    errorContainerSelector.style.display = 'block';
}

function setLoaderState(isVisible) {
    const displayState = isVisible ? 'block' : 'none';
    loaderSelector.style.display = displayState;
}

function setButtonState(isDisabled) {
    if (isDisabled) {
        buttonSelector.setAttribute('disabled', 'disabled');
    } else {
        buttonSelector.removeAttribute('disabled');
    }

    const buttonCtaState = isDisabled ? 'none' : 'block';
    buttonCtaSelector.style.display = buttonCtaState;
}

function setButtonCta(isError) {
    const buttonCta = isError ? 'Try again' : 'Get another one';
    buttonCtaSelector.innerHTML = buttonCta;
}

function getJoke() {
    XHR.open('GET', API_ENDPOINT);

    XHR.setRequestHeader('Accept', 'application/json');
    XHR.responseType = 'json';

    XHR.onload = function() {
        showJoke(XHR.response.joke);
        setButtonCta(false);
    } 

    XHR.onerror = function() {
        console.error('An error occurred, please try again')
        setButtonCta(true);
    }

    XHR.send();
}

buttonSelector.addEventListener('click', function() {
    setButtonState(true);
    setLoaderState(true);
    getJoke();
    
});