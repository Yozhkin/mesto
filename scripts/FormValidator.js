const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-message'
};

class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  };

  enableValidation() {
    this._subButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);
    this._setEventListener();
  };

  _hideInputError(errorElement, inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };

  _showInputError(errorElement, inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hasInvalidInput() {
    return Array.from(this._inputList).some((inputElement) => {
       return !inputElement.validity.valid})
  };

  _toggleButton() {
    this._hasInvalidInput()
    ? this._subButton.classList.add(this._inactiveButtonClass)
    : this._subButton.classList.remove(this._inactiveButtonClass)
  };

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.validity.valid ? this._hideInputError(errorElement, inputElement) : this._showInputError(errorElement, inputElement);
  };

  _setEventListener() {
    this._toggleButton();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButton(this._subButton);
      });
    });
  };
};

export { FormValidator, validationConfig};
