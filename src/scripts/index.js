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
import Api from '../components/Api.js';
import { data } from 'autoprefixer';

//--------------------------------------------------------------------------------------

// Экземпляр "Api"
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '643fbfe1-a52c-4c09-bf79-291897cbae22',
    'Content-Type': 'application/json'
  }
})

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
const popupWithSubmit = new PopupWithSubmit((card) => {
  api.deleteCard(card._cardID)
  .then(() =>
    card.deleteCard(),
    popupWithSubmit.closePopup()
  )
  .catch((err) => {
    console.error(`Ошибка при удалении карточки: ${err}`)})
}, '.popup_delCard');
popupWithSubmit.setEventListeners();

// Экземпляр попап создание карточки
const popupAddCard = new PopupWithForm((data) => {
  Promise.all( [api.getInfo(), api.addCard(data.card_name, data.card_link)])
  .then(([userData, cardData]) => {
    cardData.myId = userData._id;
    section.addItem(section.renderer(cardData))
    popupAddCard.closePopup();
  })
  .catch((err) => {
    console.error(`Ошибка при создании карточки: ${err}`)})
}, '.popup_addcard')

popupAddCard.setEventListeners();

// Открытие попап карт
popupButtonAddElement.addEventListener('click', () => {
  formValidationCard.resetValidationState();
  popupAddCard.openPopup();
});

//--------------------------------------------------------------------------------------

// Экземпляр "Попап профиля"
const popupProfile = new PopupWithForm((data) => {
  api.setUserInfo(data.name, data.about)
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    popupProfile.closePopup();
  })
  .catch((err) => {
    console.error(`Ошибка редактирования профиля: ${err}`)})
}, '.popup_profile')

popupProfile.setEventListeners();

const userInfo = new UserInfo( {nameSelector: '.profile__user-name',
                                aboutSelector: '.profile__about-user',
                                avatarSelector: '.profile__avatar'} );

// Открытие попап профиля
popupButtonEditElement.addEventListener('click', () => {
  const user = userInfo.getInfo();
  popupInputNameElement.value = user.name;
  popupInputJobElement.value = user.about;
  popupProfile.openPopup();
});

// Экземпляр "Попап Аватара"
const popupAvatar = new PopupWithForm((data) => {
  api.setAvatar(data.avatar_link)
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    popupAvatar.closePopup();
  })
  .catch((err) => {
    console.error(`Ошибка редактирования Аватара: ${err}`)})
}, '.popup_avatar')

// Открытие "попап Аватар"
popupButtonAvatarElement.addEventListener('click', () => {
  formValidationAvatar.resetValidationState();
  popupAvatar.openPopup();
});

popupAvatar.setEventListeners();

const section = new Section({
  items: [],
  renderer: (data) => {
    const card = new Card(data, '#template-cards', popupImage.openPopupImage, popupWithSubmit.open);
    // console.log(data)
    return card.generateCard();
  }
}, '.elements__container')


Promise.all([api.getInfo(), api.getCards()])
  .then(([userData, cardData]) => {
    cardData.forEach(element => {element.myId = userData._id})
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar)
    section.setItems(cardData.reverse());
    section.addCard() })
    .catch((err) => {
      console.error(`Ошибка рендеринга карточек: ${err}`)})

