import { initialCards,
         popupButtonAddElement,
         popupButtonEditElement,
         formAddCard,
         formProfile,
         profileJobElement,
         profileNameElement,
         popupInputJobElement,
         popupInputNameElement,
         popupInputLinkCard,
         popupInputTitleCard } from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator, validationConfig } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';

//--------------------------------------------------------------------------------------

// Экземпляры форм
const formValidationProfile = new FormValidator(validationConfig, formProfile);
const formValidationCard = new FormValidator(validationConfig, formAddCard);
formValidationProfile.enableValidation();
formValidationCard.enableValidation();

// Экземпляр "попап фото"
const popupImage = new PopupWithImage('.popup_zoom');
popupImage.setEventListeners();

// Экземпляр Секции для карт(добавляем карты на страницу)
const section = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, '#template-cards', popupImage.openPopupImage);
    return card.generateCard();
  }
}, '.elements__container')

section.addCard();

//--------------------------------------------------------------------------------------

// Экземпляр "Попап карточек"
const popupAddCard = new PopupWithForm(handleFormSubmitCard, '.popup_addcard');
popupAddCard.setEventListeners();

// Открытие попап карт
popupButtonAddElement.addEventListener('click', () => {
  formValidationCard.resetValidationState();
  popupAddCard.openPopup();
});

// Фунция сабмит карточки через попап
function handleFormSubmitCard() {
  const card = { name: popupInputTitleCard.value, link: popupInputLinkCard.value };
  section.addItem(section.renderer(card))
  popupAddCard.closePopup();
};

//--------------------------------------------------------------------------------------

// Экземпляр "Попап профиля"
const popupProfile = new PopupWithForm(handleFormSubmitProfile, '.popup_profile');
popupProfile.setEventListeners();

// Открытие попап профиля
popupButtonEditElement.addEventListener('click', () => {
  popupInputNameElement.value = profileNameElement.textContent;
  popupInputJobElement.value = profileJobElement.textContent;
  formValidationProfile.resetValidationState();
  popupProfile.openPopup()
});

//Функция сабмит профиля
function handleFormSubmitProfile() {
  profileNameElement.textContent = popupInputNameElement.value;
  profileJobElement.textContent = popupInputJobElement.value;
  popupProfile.closePopup();
};


