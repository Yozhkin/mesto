export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._popupCloseButton = this._popup.querySelector('.popup__button-close');
  };

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleCloseEsc);
  };

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleCloseEsc);
  };

  _handleCloseEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup()
    };
  };

  _closePopupByClickOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.closePopup()
    };
  };

  _handleCloseButton = () => {
    this.closePopup();
  };

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', this._handleCloseButton);
    this._popup.addEventListener('mousedown', this._closePopupByClickOverlay);
  }
}
