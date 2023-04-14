const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-message'
};

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
    toggleButtonState(inputList, submitButton, rest);
    input.addEventListener('input', () => {
      checkInputValidity(input, rest);
      toggleButtonState(inputList, submitButton, rest);
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

function toggleButtonState(inputList, buttonElement, {inactiveButtonClass}) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  };
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
}); };

enableValidation(validationConfig);
