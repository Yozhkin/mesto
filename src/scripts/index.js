import '../pages/index.css'
import { initialCards,
         popupButtonAddElement,
         popupButtonEditElement,
         popupButtonAvatarElement,
         formAddCard,
         formProfile,
         formAvatar,
         popupInputJobElement,
         popupInputNameElement,
         popupInputLinkCard,
         popupInputTitleCard } from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator, validationConfig } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';

//--------------------------------------------------------------------------------------

// Экземпляры форм
const formValidationProfile = new FormValidator(validationConfig, formProfile);
const formValidationCard = new FormValidator(validationConfig, formAddCard);
const formValidationAvatar = new FormValidator(validationConfig, formAvatar);
formValidationProfile.enableValidation();
formValidationCard.enableValidation();
formValidationAvatar.enableValidation();

// Экземпляр "попап фото"
const popupImage = new PopupWithImage('.popup_zoom');
popupImage.setEventListeners();

// Экземпляр попап удаления карточки

const popupWithSubmit = new PopupWithSubmit(() => {
}, '.popup_delCard');
popupWithSubmit.setEventListeners();
// Экземпляр Секции для карт(добавляем карты на страницу)
const section = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, '#template-cards', popupImage.openPopupImage, popupWithSubmit.open);
    return card.generateCard();
  }
}, '.elements__container')

section.addCard();

//--------------------------------------------------------------------------------------

// Экземпляр "Попап карточек"
const popupAddCard = new PopupWithForm(() => {
  const card = { name: popupInputTitleCard.value, link: popupInputLinkCard.value };
  section.addItem(section.renderer(card))
  popupAddCard.closePopup();
}, '.popup_addcard');

popupAddCard.setEventListeners();

// Открытие попап карт
popupButtonAddElement.addEventListener('click', () => {
  formValidationCard.resetValidationState();
  popupAddCard.openPopup();
});

//--------------------------------------------------------------------------------------

// Экземпляр "Попап профиля"
const popupProfile = new PopupWithForm(() => {
  userInfo.setUserInfo(popupInputNameElement.value, popupInputJobElement.value);
  popupProfile.closePopup();
}, '.popup_profile');

popupProfile.setEventListeners();

const userInfo = new UserInfo( {nameSelector: '.profile__user-name',
                                aboutSelector: '.profile__about-user'} );

// Открытие попап профиля
popupButtonEditElement.addEventListener('click', () => {
  const user = userInfo.getInfo();
  popupInputNameElement.value = user.name;
  popupInputJobElement.value = user.about;
  popupProfile.openPopup();
});

// Экземпляр "Попап Аватара"
const popupAvatar = new PopupWithForm((data) => {
    const avatarPic = document.querySelector('.profile__avatar');
    avatarPic.src = data.avatar_link;
    popupAvatar.closePopup();
}, '.popup_avatar');

// Открытие "попап Аватар"
popupButtonAvatarElement.addEventListener('click', () => {
  formValidationAvatar.resetValidationState();
  popupAvatar.openPopup();
});

popupAvatar.setEventListeners();
