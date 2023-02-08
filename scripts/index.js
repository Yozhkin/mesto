const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupElement = document.querySelector('.popup');
const popupButtonCloseElement = popupElement.querySelector('.popup__button-close');
const popupButtonEditElement = document.querySelector('.profile__edit-button');
let popupInputNameElement = popupElement.querySelector('.popup__input_type_name');
let popupInputJobElement = popupElement.querySelector('.popup__input_type_job');
let formElement = popupElement.querySelector('.popup__form');
let profileNameElement = document.querySelector('.profile__user-name');
let profileJobElement = document.querySelector('.profile__about-user');
const likeAddedElements = document.querySelectorAll('.elements__like');
const templateCard = document.querySelector('#template-cards').content;
const cardsBlock = document.querySelector('.elements__cards');

const createCard = function(item) {
  const card = templateCard.cloneNode(true);
  card.querySelector('.elements__title').textContent = item.name;
  card.querySelector('.elements__foto').src = item.link;

  const like = card.querySelector('.elements__like');
    like.addEventListener('click', function(event) {
    event.target.classList.toggle('elemetns__like_added'); });
  return card;
};

const renderCard = function(item) {
  cardsBlock.append(createCard(item));
};

 initialCards.forEach(function(item) {
   renderCard(item);
   });

// Функция открытия popup
function openPopup() {
  popupInputNameElement.value = profileNameElement.textContent;
  popupInputJobElement.value = profileJobElement.textContent;
  popupElement.classList.add('popup_opened');
};

function closePopup() {
  popupElement.classList.remove('popup_opened');
};

// Фунция зарытия popup overlay

// function closePopupByClickOverlay(event) {
//   if (event.target !== event.currentTarget) {
//   return;
// }
//   closePopup();
// };

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = popupInputNameElement.value;
  profileJobElement.textContent = popupInputJobElement.value;
  closePopup();
};


popupButtonEditElement.addEventListener('click', openPopup);
popupButtonCloseElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

// popupElement.addEventListener('click', closePopupByClickOverlay);
