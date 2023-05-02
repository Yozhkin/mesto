import { initialCards } from './constants.js';
import { Card } from './Card.js';
import { FormValidator, validationConfig } from './FormValidator.js';

// Формы
const formProfile = document.forms.popup_form_profile;
const formAddCard = document.forms.popup_form_addcard;
const formValidationProfile = new FormValidator(validationConfig, formProfile);
formValidationProfile.enableValidation();
const formValidationCard = new FormValidator(validationConfig, formAddCard);
formValidationCard.enableValidation();

const popupElements = document.querySelectorAll('.popup');
const profileNameElement = document.querySelector('.profile__user-name');
const profileJobElement = document.querySelector('.profile__about-user');

// Кнопки попап
const popupButtonEditElement = document.querySelector('.profile__edit-button');
const popupButtonAddElement = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__button-close');

// Попап профиля
const popupProfileElement = document.querySelector('.popup_profile');
const popupInputNameElement = popupProfileElement.querySelector('.popup__input_type_name');
const popupInputJobElement = popupProfileElement.querySelector('.popup__input_type_job');
const formProfileElement = popupProfileElement.querySelector('#popup_form_profile');

// Попап добавление фото
const popupAddCardElement = document.querySelector('.popup_addcard');
const popupInputTitleCard = popupAddCardElement.querySelector('.popup__input_type_title');
const popupInputLinkCard = popupAddCardElement.querySelector('.popup__input_type_link');
const formAddCardElement = popupAddCardElement.querySelector('#popup_form_addcard');

// Зум фото
const popupZoomElement = document.querySelector('.popup_zoom');
const popupZoomImg = popupZoomElement.querySelector('.popup__foto');
const popupZoomTitle = popupZoomElement.querySelector('.popup__foto-caption');

//Функция открытия попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
};

// Функция открытия попап увеличенного фото
function openPicturePopup(data) {
  popupZoomImg.src = data.link;
  popupZoomImg.alt = data.name;
  popupZoomTitle.textContent = data.name;
  openPopup(popupZoomElement)
};

//Функция закрытия попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
};

// Фунция закрытие попап overlay
function closePopupByClickOverlay(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }
    closePopup(evt.target);
  };

// Закрытие попап при нажатии на 'Esc'
function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened)
  };
};

// Фунция создания карточки
function createCard(data) {
  const card = new Card(data, '#template-cards', openPicturePopup);
  return card.generateCard();
  };

// Фунция сабмит карточки через попап
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const card  = {name: popupInputTitleCard.value, link: popupInputLinkCard.value};
  document.querySelector('.elements__container').prepend(createCard(card));
  evt.target.reset();
  closePopup(popupAddCardElement);
};

// Функция сабмит профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileNameElement.textContent = popupInputNameElement.value;
  profileJobElement.textContent = popupInputJobElement.value;
  closePopup(popupProfileElement);
};

// Закрытие попап на крестик
popupCloseButtons.forEach((button) => {
  const popupClose = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popupClose));
});

// Закрытие попап overlay
popupElements.forEach((overlay) => {
  overlay.addEventListener('click', (evt) => closePopupByClickOverlay(evt));
});

initialCards.forEach((item) => {
   document.querySelector('.elements__container').append(createCard(item));
});

// Открытие попап карт
popupButtonAddElement.addEventListener('click', () => {
  formValidationCard.resetValidationState();
  openPopup(popupAddCardElement);
});

// Сабмит попап карт
formAddCardElement.addEventListener('submit', handleFormSubmitCard);

// Открытие попап профиля
popupButtonEditElement.addEventListener('click', () => {
  popupInputNameElement.value = profileNameElement.textContent;
  popupInputJobElement.value = profileJobElement.textContent;
  formValidationProfile.resetValidationState();
  openPopup(popupProfileElement);
});

// Сабмит поап профиля
formProfileElement.addEventListener('submit', handleFormSubmitProfile);
