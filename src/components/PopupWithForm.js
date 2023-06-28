import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleSubmit, selector) {
    super(selector),
    this._handleSubmit = handleSubmit,
    this._form = this._popup.querySelector('.popup__form'),
    this._inputList = this._popup.querySelectorAll('.popup__input')
  };

  _getInputValues() {
   const data = {};
    this._inputList.forEach(input => {
        data[input.name] = input.value
    });
    return data;
};

  closePopup() {
    super.closePopup();
    this._form.reset();
  };

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues())
    })
  }
}
