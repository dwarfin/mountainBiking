/* Project:  Project 5
Name: Isaac Reyes
Submitted: 4/26/23
 
I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student, 
or leaving my code on a public web site constitutes cheating.
I acknowledge that  If I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.
 
Reflection (1-2 paragraphs): The template for this part of the assignment helped a lot. That
    is usually always one thing I struggle with. I get to caught up in my thoughts and just want
    to make my website a reality as soon as possible. This usually leads to a increased time in 
    making the website look excatly how I want it to and usually they lack in JS. The template helped
    to break this complex project into smaller manageable pieces. 

    In the future I would like to make this code a class with methods. Im not necessarily sure if that 
    is the most optimal but I think it could be a good challenge. */

let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/

const stateAbbreviations = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
  'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
  'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
  'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
  'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];

let form=null;
let successMessage=null;

// Create a function to initialize the validation process.
function validationInitialization(id, success) {
    form = document.getElementById(id)
    successMessage = document.getElementById(success)

    // Get all the inputs within the form.
    const inputs = document.querySelectorAll("input");

    // Loop through the list of inputs and add an event listener.
    for (const element of inputs) {
        // For each input that is changed call the function inputModified.
        element.addEventListener("change", inputModified);
    }
    // Add an event listener for when the register/submit button is clicked.
    form.addEventListener("submit", formSubmit)
}

// Function that is called when input is changed.
function inputModified(event) {

    // Detect what input is being changed
    let el = event.currentTarget;

    // Validate the form. 
    validateForm();

    // Add the incorrectInput class to the element that is incorrect.
    el.classList.add("incorrectInput")
}

// Make a function that handles the form submit.
function formSubmit(event) {
    let form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    validateForm();

    // Check the validity of the form when form is submitted.
    // If there are invalid inputs loop through them.
    if (!form.checkValidity()) {
        // Loop through each form element that is invalid and add the incorrectInput clas.
        for (const element of form.elements) {
            let elem = element;
            // Check if it's not valid or has no input to make sure it is only the one field to add the class to.
            if (!elem.validity.valid || elem.value === '') {
                elem.classList.add('incorrectInput');
            }
        }
    // If there are no invalid inputs
    } else { 
        // Hide the form
        form.style.display = 'none';
        
        // Create an element in this case a <p> to display the success message.
        let successMessage = document.createElement('p');

        // Set the <p> text message.
        successMessage.textContent = 'Your form has successfully been submitted!';

        // Insert the success message into the website.
        form.parentNode.insertBefore(successMessage, form.nextSibling);

        // Add a link in the success page to redirect to the home page/
        let link = document.createElement('a');
        link.setAttribute('href', 'index.html');
        link.textContent = ' Press here to return to the home page';
        
        // Append the link to the success message.
        successMessage.appendChild(link);
    }
}

// Function to validate the form
function validateForm() {

    // Use checkValid to set the id and error message.
    checkValid("firstName", "First Name is Required");
    checkValid("lastName", "Last Name is Required");
    checkValid("address", "Address is Required");
    checkValid("city", "City is Required");
  
    // If the state has an input check it with validateState
    if(checkValid("state", "State is Required")){
        // Validate the state, making sure it exists in the above list of states
        validateState("state", "Not a valid State, enter two digit code e.g., UT");
    }
 
    // If the email has an input check it against the format
    if (checkValid("email", "Email Address is required")) {
        // Validate the email, making sure it follows the regex. Set the error message if not.
       checkFormat("email", "Email format is incorrect, Must include text before and after '@', '@', and a domain extension Ex. '.com', '.edu', '.gov'", emailRegex)
    }

    // If the zip has an input check it against the format
    if (checkValid("zip", "Zip Code is Required")) {
        // Validate the zip, making sure it follows the regex. Set the error message if not.
        checkFormat("zip", "Zip Code format is incorrect, please use either '#####', or '#####-#### format'.", zipCodeRegex)
    }

    // If the phone has an input check it against the format
    if (checkValid("phone", "Phone is required")) {
        // Validate the phone, making sure it follows the regex. Set the error message if not.
        checkFormat("phone", "Phone format is incorrect", phoneRegex)
    }

    // Check that there is atleast one box selected. Set the error message if not.
    checkValid("newspaper", "Please select one!")
}

// Function to validate the state
function validateState(id, message) {

    // Get the id of the state input
    let el = document.getElementById(id);
    let valid = false;

    // Set the text to uppercase and see if it exists in the states array.
    // If it does validate the state input
    if (stateAbbreviations.includes(el.value.toUpperCase())) {
        valid = true
    }
 
    // Call a function to show the input is valid
    setValid(id, valid, message);
}

// Function to check the format.
function checkFormat(id, message, regex) {

    // Initially, the validity of the input will be false. 
    let valid = false

    // Only when the input matches the regex then will it be validated.
    if (regex.test(document.getElementById(id).value)) {
        valid = true
    }

    // Call a function to show the input is valid.
    setValid(id, valid, message);
    return valid;

}

// Function to check if any missing inputs exist in the form
function checkValid(id, message) {
    let elem = document.getElementById(id);
    let valid = false;
    let type = elem.type;

    // Check the type of the element. If it is a text proceed.
    if (type == 'text') {
        // If the input has a value length greater than 0 it is valid.
        if (elem.value.trim().length > 0) {
            valid = true; 
        }
    }
    // Ckeck the type of the element. If it is a checkbox proceed.
    if (type == 'checkbox') {
        // Get the checkboxes
        const inputElements = document.querySelectorAll(`input[name="${elem.name}"]`);

        // Loop through the checkboxes and ensure at least one is checked.
        for (const element of inputElements) {
            // If at least one checkbox is checked then this part of the form is validated.
            if (element.checked) {
                valid = true;
                // Break the loop as soon as it finds the first checked box.
                // There is no need to find all of the checked boxes only one.
                // If this were to be scaled up a lot it could imrpove the time complexity. Since there are only 3 inputs it is not all that necesaary. 
                break;
            }
        }
    }

    // Call a function to show the input is valid.
    setValid(id, valid, message);
    return valid;
}


function setValid(id, valid, message) {

    let elem = document.getElementById(id);
    let errorMessageElem = elem.nextElementSibling;

    // Since newspaper is not a direct siblings with the errorMessage we must use nextSibling twice.
    if (elem.id == 'newspaper') {
        errorMessageElem = elem.nextElementSibling.nextElementSibling;
    }

    // If it is valid, meaning it has value proceed.
    if (valid) {
        // Remove the error message if it once existed
        elem.setCustomValidity('');

        // Add the incorrectInput class to all inputs that are not correct.
        errorMessageElem.classList.add("incorrectInput")

        // If input has a value and it is correct add a green tint to the input.
        // This if statement prevents all the form items from being incorrect when only one is. 
        if (elem.id == elem.name) {
            elem.classList.add("correctInput")
        }

        // Remove the error message.
        errorMessageElem.textContent = '';
        
    // If it is not valid.
    } else {

        // Set the validity to the message 
        elem.setCustomValidity(message);

        // Set the error message to the message
        errorMessageElem.textContent = message;
    }
}