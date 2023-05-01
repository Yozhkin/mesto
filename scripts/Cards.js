class Card {
  constructor(data, templateCard, openPicturePopup) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateCard = templateCard;
    this._openPicturePopup = openPicturePopup;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateCard)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);
      return cardElement;
  };

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _toggleLike = () => {
    this._likeButton.classList.toggle('elemetns__like_added');
  };

  _handleOpenPicturePopup = () => {
    this._openPicturePopup(this._data);
  }

  _setEventListener() {
    this._deleteButton.addEventListener('click', this._deleteCard);
    this._likeButton.addEventListener('click', this._toggleLike);
    this._elementPicture.addEventListener('click', this._handleOpenPicturePopup)
  };

  generateCard() {
    this._element = this._getTemplate();
    this._nameElement =  this._element.querySelector('.elements__title');
    this._elementPicture = this._element.querySelector('.elements__foto');
    this._deleteButton = this._element.querySelector('.elements__del-btn');
    this._likeButton = this._element.querySelector('.elements__like');
    this._nameElement.textContent = this._name;
    this._elementPicture.src = this._link;
    this._elementPicture.alt = this._name;
    this._setEventListener();
    return this._element;
  };
};

export { Card };
