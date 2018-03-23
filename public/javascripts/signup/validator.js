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
}

/* input validation */

function isEmpty (string) {
    if (string.length === 0) {
        return "You can't leave this empty.";
    }
}

function isLettersAndNumbers (string) {
    if (! /^\w+$/.test(string)) {
        return 'Please use only letters and numbers.';
    }
}

function isLetters (string) {
    if (! /^[a-zA-Z]+$/.test(string)) {
        return 'Please use only letters.';
    }
}

/* first name input validation */

function checkFirstNameInput () {
    const name_input_value = this.value;
    const error = isEmpty(name_input_value) ||
    isLetters(name_input_value);
    if (error) {
        displayFirstNameError(error);
    }
}

/* last name input validation */

function checkLastNameInput () {
    const name_input_value = this.value;
    const error = isEmpty(name_input_value) ||
    isLetters(name_input_value);
    if (error) {
        displayLastNameError(error);
    }
}

/* username input validation */

function checkUsernameInput () {
    const username_input_value = this.value;
    const error = isEmpty(username_input_value) ||
    isValidUsernameLength(username_input_value) ||
    isLettersAndNumbers(username_input_value) ||
    isDuplicateUsername(username_input_value);
    if (error) {
        displayUsernameError(error);
    }
}

function isValidUsernameLength (string) {
    if (string.length < 5 || string.length > 20) {
        return 'Please use between 5 and 20 characters.';
    }
}

function isDuplicateUsername (string) {
    // should make request to server to check
    // the db
//     return 'This username is already taken.';
}

/* email address input validation */

function checkEmailAddressInput () {
    const email_address_input_value = this.value;
    const error = isEmpty(email_address_input_value) ||
    isValidEmailAddress(email_address_input_value);
    if (error) {
        displayEmailAddressError(error);
    }
}

function isValidEmailAddress(string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (! re.test(String(string).toLowerCase())) {
        return 'Invalid email address.';
    }
}

/* password input validation */

function checkPasswordInput () {
    const password_input_value = this.value;
    const error = isEmpty(password_input_value) ||
    isValidPasswordLength(password_input_value);
    if (error) {
        displayPasswordError(error);
    }
}

function isValidPasswordLength (string) {
    if (string.length < 8 || string.length > 100) {
        return 'Please use between 8 and 100 characters.';
    }
}

/* confirm password input validation */

function checkConfirmPasswordInput (password_input) {
    const confirm_password_input_value = this.value;
    const password_input_value = password_input.value;
    console.log(confirm_password_input_value);
    const error = isEmpty(confirm_password_input_value) ||
    areMatchingPasswords(confirm_password_input_value, password_input_value);
    if (error) {
        displayConfirmPasswordError(error);
    }
}

function areMatchingPasswords (string1, string2) {
    if (string1 !== string2) {
        return "These passwords don't match. Try again?";
    }
}

/* display error */

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

/* hide error */

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
