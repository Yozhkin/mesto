import { initialCards } from "./constants.js";

class Card {
  constructor(data, templateCard) {
    this._name = data.name;
    this._link = data.link;
    this._templateCard = templateCard;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateCard)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);
      return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__foto').src = this._link;
    return this._element;
  };
}

 initialCards.forEach((item) => {
  const card = new Card(item, '#template-cards');
  const cardElement = card.generateCard();
  document.querySelector('.elements__container').append(cardElement);
});

export { Card };
