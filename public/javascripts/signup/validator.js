document.addEventListener('DOMContentLoaded', validate);

function validate () {

    const first_name_input = document.getElementById('first-name-input');
    first_name_input.addEventListener('blur', checkFirstNameInput);
    first_name_input.addEventListener('keypress', hideFirstNameError);
    first_name_input.addEventListener('change', hideFirstNameError);

    const last_name_input = document.getElementById('last-name-input');
    last_name_input.addEventListener('blur', checkLastNameInput);
    last_name_input.addEventListener('keypress', hideLastNameError);
    last_name_input.addEventListener('change', hideLastNameError);

    const username_input = document.getElementById('username-input');
    username_input.addEventListener('blur', checkUsernameInput);
    username_input.addEventListener('keypress', hideUsernameError);

    const email_address_input = document.getElementById('email-address-input');
    email_address_input.addEventListener('blur', checkEmailAddressInput);
    email_address_input.addEventListener('keypress', hideEmailAddressError);
    email_address_input.addEventListener('change', hideEmailAddressError);

    const password_input = document.getElementById('password-input');
    password_input.addEventListener('blur', checkPasswordInput);
    password_input.addEventListener('keypress', hidePasswordError);

    const confirm_password_input = document.getElementById('confirm-password-input');
    confirm_password_input.addEventListener('blur', checkConfirmPasswordInput.bind(confirm_password_input, password_input));
    confirm_password_input.addEventListener('keypress', hideConfirmPasswordError);

    const submit_input = document.getElementById('submit-input');
    submit_input.addEventListener('click', checkAllInputs.bind(event));
}

/* ------------------------------------------------------------------------------------------------
    Check All Inputs
------------------------------------------------------------------------------------------------ */

function checkAllInputs (event) {

    event.preventDefault(event);

    const first_name_input = document.getElementById('first-name-input');
    const last_name_input = document.getElementById('last-name-input');
    const username_input = document.getElementById('username-input');
    const email_address_input = document.getElementById('email-address-input');
    const password_input = document.getElementById('password-input');
    const confirm_password_input = document.getElementById('confirm-password-input');

    const first_name_error = checkFirstNameInput.call(first_name_input);
    const last_name_error = checkLastNameInput.call(last_name_input);
    const username_error = checkUsernameInput.call(username_input);
    const email_address_error = checkEmailAddressInput.call(email_address_input);
    const password_error = checkPasswordInput.call(password_input);
    const confirm_error = checkConfirmPasswordInput.call(confirm_password_input, password_input);

    if (!first_name_error &&
        !last_name_error &&
        !username_error &&
        !email_address_error &&
        !password_error &&
        !confirm_error) {
            window.location.href ="/profile";
            // should send an xml http request to double check that the input is correct on the server-side
        }
}

/* ------------------------------------------------------------------------------------------------
    Generic Input Validation
------------------------------------------------------------------------------------------------ */

function checkIfEmpty (string) {
    if (string.length === 0) {
        return "You can't leave this empty.";
    }
}

function checkOnlyLettersAndNumbers (string) {
    if (! /^\w+$/.test(string)) {
        return 'Please use only letters and numbers.';
    }
}

function checkOnlyLetters (string) {
    if (! /^[a-zA-Z]+$/.test(string)) {
        return 'Please use only letters.';
    }
}

/* ------------------------------------------------------------------------------------------------
    First Name Validation
------------------------------------------------------------------------------------------------ */

function checkFirstNameInput () {
    const value = this.value;
    const error = checkIfEmpty(value) ||
        checkOnlyLetters(value);
    if (error) {
        displayFirstNameError(error);
        return error;
    }
}

/* ------------------------------------------------------------------------------------------------
    Last Name Validation
------------------------------------------------------------------------------------------------ */

function checkLastNameInput () {
    const value = this.value;
    const error = checkIfEmpty(value) ||
        checkOnlyLetters(value);
    if (error) {
        displayLastNameError(error);
        return error;
    }
}

/* ------------------------------------------------------------------------------------------------
    Username Validation
------------------------------------------------------------------------------------------------ */

function checkUsernameInput () {
    const value = this.value;
    const error = checkIfEmpty(value) ||
        checkUsernameLength(value) ||
        checkOnlyLettersAndNumbers(value) ||
        checkDuplicateUsername(value);
    if (error) {
        displayUsernameError(error);
        return error;
    }
}

function checkUsernameLength (string) {
    if (string.length < 5 || string.length > 20) {
        return 'Please use between 5 and 20 characters.';
    }
}

function checkDuplicateUsername (string) {
    // should make request to server to check
    // the db
//     return 'This username is already taken.';
}

/* ------------------------------------------------------------------------------------------------
    Email Address Validation
------------------------------------------------------------------------------------------------ */

function checkEmailAddressInput () {
    const value = this.value;
    const error = checkIfEmpty(value) ||
        checkValidEmailAddress(value);
    if (error) {
        displayEmailAddressError(error);
        return error;
    }
}

function checkValidEmailAddress(string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (! re.test(String(string).toLowerCase())) {
        return 'Invalid email address.';
    }
}

function checkDuplicateEmailAddress (string) {
    // should check if email address exists in db
    // return 'This email is already in use';
}

/* ------------------------------------------------------------------------------------------------
    Password Validation
------------------------------------------------------------------------------------------------ */

function checkPasswordInput () {
    const value = this.value;
    const error = checkIfEmpty(value) ||
        checkValidPasswordLength(value);
    if (error) {
        displayPasswordError(error);
        return error;
    }
}

function checkValidPasswordLength (string) {
    if (string.length < 8 || string.length > 100) {
        return 'Please use between 8 and 100 characters.';
    }
}

/* ------------------------------------------------------------------------------------------------
    Confirm Password Validation
------------------------------------------------------------------------------------------------ */

function checkConfirmPasswordInput (password_input) {
    const value = this.value;
    const password = password_input.value;
    const error = checkIfEmpty(value) ||
        areMatchingPasswords(value, password);
    if (error) {
        displayConfirmPasswordError(error);
        return error;
    }
}

function areMatchingPasswords (string1, string2) {
    if (string1 !== string2) {
        return "These passwords don't match. Try again?";
    }
}

/* ------------------------------------------------------------------------------------------------
    Display Error
------------------------------------------------------------------------------------------------ */

function displayError (id, text_content) {
    const error_p = document.getElementById(id);
    error_p.textContent = text_content;
}
function displayFirstNameError (text_content) {
    displayError('first-name-error', text_content);
}
function displayLastNameError (text_content) {
    displayError('last-name-error', text_content);
}
function displayUsernameError (text_content) {
    displayError('username-error', text_content);
}
function displayEmailAddressError (text_content) {
    displayError('email-address-error', text_content);
}
function displayPasswordError (text_content) {
    displayError('password-error', text_content);
}
function displayConfirmPasswordError (text_content) {
    displayError('confirm-password-error', text_content);
}

/* ------------------------------------------------------------------------------------------------
    Hide Error
------------------------------------------------------------------------------------------------ */

function hideError (error_p_id) {
    const error_p = document.getElementById(error_p_id);
    error_p.textContent = '';
}
function hideFirstNameError () {
    hideError('first-name-error');
}
function hideLastNameError () {
    hideError('last-name-error');
}
function hideUsernameError () {
    hideError('username-error');
}
function hideEmailAddressError () {
    hideError('email-address-error');
}
function hidePasswordError () {
    hideError('password-error');
}
function hideConfirmPasswordError () {
    hideError('confirm-password-error');
}
