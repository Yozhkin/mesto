class Card {
  constructor(data, templateCard, openPicturePopup, openDelPopup) {
    this._data = data;
    this._link = data.link;
    this._myId = data.myId;
    this._likes = data.likes;
    this._likesLength = data.likes.length;
    this._cardID = data._id;
    this._ownerId = data.owner._id;
    this._templateCard = templateCard;
    this._openPicturePopup = openPicturePopup;
    this._openDelPopup = openDelPopup;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateCard)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);
      return cardElement;
  };

  deleteCard = () => {
    this._element.remove();
    this._likeButton = null;
    this._deleteButton = null;
    this._elementPicture = null;
    this._nameElement = null;
    this._element = null;

  };

  _toggleLike = () => {
    this._likeButton.classList.toggle('elemetns__like_added');
  };

  _handleOpenPicturePopup = () => {
    this._openPicturePopup(this._data);
  }

  _handleOpenDelPopup = () => {
    this._openDelPopup(this)
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', this._handleOpenDelPopup);
    this._likeButton.addEventListener('click', this._toggleLike);
    this._elementPicture.addEventListener('click', this._handleOpenPicturePopup);
  };

  _isOwner() {
    if (this._myId !== this._ownerId) {
        this._deleteButton.remove();
        this._deleteButton = null;
    }
  };

  _isLiked() {
    this._likes.forEach((user) => {
      if (user._id === this._myId) {
          this._toggleLike();
      } else {
        // this._toggleLike();
        }
      })
    this._likeCounter.textContent = this._likesLength
  }

  generateCard() {
    this._element = this._getTemplate();
    this._nameElement =  this._element.querySelector('.elements__title');
    this._elementPicture = this._element.querySelector('.elements__foto');
    this._deleteButton = this._element.querySelector('.elements__del-btn');
    this._likeButton = this._element.querySelector('.elements__like');
    this._likeCounter = this._element.querySelector('.elements__like-counter');
    this._nameElement.textContent = this._data.name;
    this._elementPicture.src = this._link;
    this._elementPicture.alt = this._data.name;
    this._setEventListeners();
    this._isOwner();
    this._isLiked();
    return this._element;
  };
};

export { Card };
