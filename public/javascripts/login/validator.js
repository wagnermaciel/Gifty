document.addEventListener('DOMContentLoaded', validate);

function validate () {

    const username_input = document.getElementById('username-input');
    username_input.addEventListener('keypress', hideUsernameError);

    const password_input = document.getElementById('password-input');
    password_input.addEventListener('keypress', hidePasswordError);

    const submit_input = document.getElementById('submit-input');
    submit_input.addEventListener('click', checkAllInputs.bind(event));
}

/* username and password input validation */

function checkAllInputs () {
    event.preventDefault();
    const username_input = document.getElementById('username-input');
    const password_input = document.getElementById('password-input');
    const username_input_value = username_input.value;
    const password_input_value = password_input.value;
    const username_error = checkUsernameInput(username_input_value);
    const password_error = checkPasswordInput(password_input_value);
    if (!username_error && !password_error) {
        window.location.href ="/profile";
    }
}

/* input validation */

function isEmpty (string) {
    if (string.length === 0) {
        return "You can't leave this empty";
    }
}

function isLettersAndNumbers (string) {
    if (! /^\w+$/.test(string)) {
        return 'Invalid username';
    }
}

/* username input validation */

function checkUsernameInput (value) {
    const error = isEmpty(value) ||
    isValidUsernameLength(value) ||
    isLettersAndNumbers(value) ||
    isExistingUsername(value);
    if (error) {
        displayUsernameError(error);
        return true;
    }
}

function isValidUsernameLength (string) {
    if (string.length < 5 || string.length > 20) {
        return 'Invalid username';
    }
}

function isExistingUsername (string) {
    // should check if username exists in db
    // return 'This username is not in use';
}

/* password input validation */

function checkPasswordInput (value) {
    const error = isEmpty(value) ||
    isValidPasswordLength(value);
    if (error) {
        displayPasswordError(error);
        return true;
    }
}

function isValidPasswordLength (string) {
    if (string.length < 8 || string.length > 100) {
        return 'Invalid password';
    }
}

/* display error */

function displayError (id, text_content) {
    const error_p = document.getElementById(id);
    error_p.textContent = text_content;
}
function displayUsernameError (text_content) {
    displayError('username-error', text_content);
}
function displayPasswordError (text_content) {
    displayError('password-error', text_content);
}

/* hide error */

function hideError (error_p_id) {
    const error_p = document.getElementById(error_p_id);
    error_p.textContent = '';
}
function hideUsernameError () {
    hideError('username-error');
}
function hidePasswordError () {
    hideError('password-error');
}
