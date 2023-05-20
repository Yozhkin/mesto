import { validationConfig } from "../../utils/constants.js";

class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._subButton = formElement.querySelector(this._submitButtonSelector);
    this._inputList = formElement.querySelectorAll(this._inputSelector);
  };

  enableValidation() {
    this._setEventListeners();
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

  _enableSubButton() {
    this._subButton.classList.remove(this._inactiveButtonClass)
    this._subButton.disabled = false;
  };

  _disableSubButton() {
    this._subButton.classList.add(this._inactiveButtonClass)
    this._subButton.disabled = true;
  };

  _toggleButton() {
    this._hasInvalidInput()
    ? this._disableSubButton()
    : this._enableSubButton()
  };

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.validity.valid ? this._hideInputError(errorElement, inputElement) : this._showInputError(errorElement, inputElement);
  };

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButton();
      });
    });
  };

  resetValidationState() {
    this._inputList.forEach(input => {
      const errorElement = this._formElement.querySelector(`#${input.id}-error`);
      if(!input.validity.valid) {
        this._hideInputError(errorElement, input);
      }
    })
    this._toggleButton()
    };
};

export { FormValidator, validationConfig};
