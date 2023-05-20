import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this._popup.querySelector('.popup__foto');
    this._popupImageCaption = this._popup.querySelector('.popup__foto-caption')
  };

   openPopupImage = (data) => {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupImageCaption.textContent = data.name;
    super.openPopup();
   };
};
