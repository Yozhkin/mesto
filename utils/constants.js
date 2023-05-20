export const initialCards = [
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

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-message'
};

// Кнопки попап
export const popupButtonEditElement = document.querySelector('.profile__edit-button');
export const popupButtonAddElement = document.querySelector('.profile__add-button');
// Формы
export const formProfile = document.forms.popup_form_profile;
export const formAddCard = document.forms.popup_form_addcard;
//
export const profileNameElement = document.querySelector('.profile__user-name');
export const profileJobElement = document.querySelector('.profile__about-user');
// Попап профиля
const popupProfileElement = document.querySelector('.popup_profile');
export const popupInputNameElement = popupProfileElement.querySelector('.popup__input_type_name');
export const popupInputJobElement = popupProfileElement.querySelector('.popup__input_type_job');
// Попап добавление фото
const popupAddCardElement = document.querySelector('.popup_addcard');
export const popupInputTitleCard = popupAddCardElement.querySelector('.popup__input_type_title');
export const popupInputLinkCard = popupAddCardElement.querySelector('.popup__input_type_link');
