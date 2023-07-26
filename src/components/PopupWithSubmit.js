import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(handleSubmit, selector) {
    super(selector),
    this._handleSubmit = handleSubmit,
    this._deleteBtn = document.querySelector('.popup__button-del')
  }

  open = (item) => {
    this._item = item;
    super.openPopup();

}

  setEventListeners = () =>{
    super.setEventListeners();
    this._deleteBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
        this._handleSubmit(this._item)
    })
  }
}
