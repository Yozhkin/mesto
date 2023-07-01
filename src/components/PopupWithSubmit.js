import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(handleSubmit, selector) {
    super(selector),
    this._handleSubmit = handleSubmit,
    this._deleteBtn = document.querySelector('.popup__button-del')
  }

  open = (card) => {
    this._card = card;
    super.openPopup();

}

  setEventListeners = () =>{
    super.setEventListeners();
    this._deleteBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
        this._handleSubmit(this._card)
    })
}
}
