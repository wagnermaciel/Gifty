document.addEventListener('DOMContentLoaded', validate);

function validate () {

    const username_input = document.getElementById('username-input');
    username_input.addEventListener('keypress', hideUsernameError);

    const password_input = document.getElementById('password-input');
    password_input.addEventListener('keypress', hidePasswordError);

    const submit_input = document.getElementById('submit-input');
    submit_input.addEventListener('click', checkAllInputs.bind(event));
}

/* ------------------------------------------------------------------------------------------------
    Check All Inputs
------------------------------------------------------------------------------------------------ */

function checkAllInputs () {
    event.preventDefault(event);
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

/* ------------------------------------------------------------------------------------------------
    Generic Input Validation
------------------------------------------------------------------------------------------------ */

function checkIfEmpty (string) {
    if (string.length === 0) {
        return "You can't leave this empty";
    }
}

function checkOnlyLettersAndNumbers (string) {
    if (! /^\w+$/.test(string)) {
        return 'Invalid username';
    }
}

/* ------------------------------------------------------------------------------------------------
    Username Validation
------------------------------------------------------------------------------------------------ */

function checkUsernameInput (value) {
    const error = checkIfEmpty(value) ||
        checkUsernameLength(value) ||
        checkOnlyLettersAndNumbers(value) ||
        checkDuplicateUsername(value);
    if (error) {
        displayUsernameError(error);
        return true;
    }
}

function checkUsernameLength (string) {
    if (string.length < 5 || string.length > 20) {
        return 'Invalid username';
    }
}

function checkDuplicateUsername (string) {
    // should check if username exists in db
    // return 'This username is already in use';
}

/* ------------------------------------------------------------------------------------------------
    Password Validation
------------------------------------------------------------------------------------------------ */

function checkPasswordInput (value) {
    const error = checkIfEmpty(value) ||
        checkPasswordLength(value);
    if (error) {
        displayPasswordError(error);
        return true;
    }
}

function checkPasswordLength (string) {
    if (string.length < 8 || string.length > 100) {
        return 'Invalid password';
    }
}

/* ------------------------------------------------------------------------------------------------
    Display Errors
------------------------------------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------------------------------------
    Hide Errors
------------------------------------------------------------------------------------------------ */

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
