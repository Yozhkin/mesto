const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-message'
};

enableValidation(validationConfig);

function enableValidation({formSelector, ...rest}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, rest);
  });
};

function setEventListeners(formElement, {inputSelector, submitButtonSelector, ...rest}) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);
  inputList.forEach((input) => {
    toggleButton(inputList, submitButton, rest);
    input.addEventListener('input', () => {
      checkInputValidity(input, rest);
      toggleButton(inputList, submitButton, rest);
    })
  })
};

function checkInputValidity(inputElement, {inputErrorClass, errorClass}) {
  if (!inputElement.validity.valid) {
   showInputError(inputElement, inputElement.validationMessage, {inputErrorClass, errorClass});
   } else {
      hideInputError(inputElement, {inputErrorClass, errorClass});
      }
  };

function showInputError(inputElement, errorMessage, {inputErrorClass, errorClass}) {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

function hideInputError(inputElement, {inputErrorClass, errorClass}) {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButton(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  };
};



// enableValidation(validationConfig)

// function enableValidation(formElement) {
//   const formList = Array.from(document.querySelectorAll(formElement.formSelector));
//   formList.forEach((form) => {
//     form.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(form);
//   });
// };

// function setEventListeners(formElement) {
//   const inputList = Array.from(document.querySelectorAll(formElement.inputSelector));
//   console.log(inputList)
//     inputList.forEach((input) => {
//       input.addEventListener('input', () => {
//       //  checkInputValidity(formElement, input)
//       });
//     });
//    };

// function checkInputValidity(formElement, inputElement) {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMassege)
//    } else {
//       hideInputError(formElement, inputElement);
//       }
//   };

// function showInputError(formElement, inputElement, errorMessage) {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(formElement.inputErrorClass);
//   errorElement.classList.add(formElement.errorClass);
//   errorElement.textContent = errorMessage;
//  };

// function hideInputError(formElement, inputElement) {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(formElement.inputErrorClass);
//   errorElement.classList.remove(formElement.errorClass);
//   errorElement.textContent = '';
// };

// function toggleButton(inputList, buttonElement, {inactiveButtonClass}) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(inactiveButtonClass);
//     buttonElement.setAttribute('disabled', '');
//   } else {
//     buttonElement.classList.remove(inactiveButtonClass);
//     buttonElement.removeAttribute('disabled', '');
//   };
// };

// function hasInvalidInput(inputList) {
//   return Array.from(inputList).some((inputElement) => {
//     return !inputElement.validity.valid;
// }); };

// enableValidation(validationConfig);
