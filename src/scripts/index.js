import '../pages/index.css'
import { // initialCards,
         popupButtonAddElement,
         popupButtonEditElement,
         popupButtonAvatarElement,
         formAddCard,
         formProfile,
         formAvatar,
         popupInputJobElement,
         popupInputNameElement,
        // popupInputLinkCard,
        // popupInputTitleCard
        } from '../utils/constants.js';

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

// Переменная с ID пользователя 
let myId;

// Экземпляр "Api"
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: '0be9c7b8-c488-404c-bbf1-4af9ede5f800',
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
  .then(() => {
    card.deleteCard();
    popupWithSubmit.closePopup()
  })
  .catch((err) => {
    console.error(`Ошибка при удалении карточки: ${err}`)})
}, '.popup_delCard');
popupWithSubmit.setEventListeners();

// Экземпляр попап создание карточки (отправка карточки на сервер)
const popupAddCard = new PopupWithForm((data) => {
  popupAddCard.changeButtonText('Сохранение...')
  // Promise.all( [api.getInfo(), api.addCard(data.card_name, data.card_link)])
  api.addCard(data.card_name, data.card_link)
  .then((cardData) => {
    cardData.myId = myId;
    cardsContainer.addItem(cardsContainer.renderer(cardData))
    console.log(cardData.myId)
    popupAddCard.closePopup();
  })
  .catch((err) => {
    console.error(`Ошибка при создании карточки: ${err}`)})
  .finally(() => {
    popupAddCard.changeButtonText('Создать')
  })
}, '.popup_addcard')

popupAddCard.setEventListeners();

// Открытие попап карт
popupButtonAddElement.addEventListener('click', () => {
  formValidationCard.resetValidationState();
  popupAddCard.openPopup();
});

// Экземпляр "Попап профиля"
const popupProfile = new PopupWithForm((data) => {
  popupProfile.changeButtonText('Сохранение...')
  api.setUserInfo(data.name, data.about)
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    popupProfile.closePopup();
  })
  .catch((err) => {
    console.error(`Ошибка редактирования профиля: ${err}`)})
  .finally(() => {
    popupProfile.changeButtonText('Сохранить')
  })
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
  popupAvatar.changeButtonText('Сохранение...')
  api.setAvatar(data.avatar_link)
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    popupAvatar.closePopup();
  })
  .catch((err) => {
    console.error(`Ошибка редактирования Аватара: ${err}`)})
  .finally(() => {
     popupAvatar.changeButtonText('Сохранить')})
}, '.popup_avatar')

// Открытие "попап Аватар"
popupButtonAvatarElement.addEventListener('click', () => {
  formValidationAvatar.resetValidationState();
  popupAvatar.openPopup();
});
popupAvatar.setEventListeners();

// Установка лайка
const addLike = (cardId, countLikes, changeLike) => {
  api.addLikeCard(cardId)
    .then((res) => {
      changeLike();
      countLikes(res.likes.length);
    })
    .catch((err) => {
      console.error(`Ошибка установки лайка: ${err}`)})
};

// Удаление лайка
const delLike = (cardId, countLikes, changeLike) => {
  api.delLikeCard(cardId)
    .then((res) => {
      changeLike();
      countLikes(res.likes.length);
    })
    .catch((err) => {
      console.error(`Ошибка снятия лайка: ${err}`)})
};

// Экземпляр карточки
const cardsContainer = new Section({
  items: [],
  renderer: (data) => {
    const card = new Card(data, '#template-cards', myId, popupImage.openPopupImage, popupWithSubmit.open, addLike, delLike);
    // console.log(data)
    return card.generateCard();
  }
}, '.elements__container')

//Рендеринг карточек с сервера
Promise.all([api.getInfo(), api.getCards()])
  .then(([userData, cardData]) => {
    cardData.forEach(element => {element.myId = userData._id})
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar)
    myId = userData._id;
    cardsContainer.setItems(cardData.reverse());
    cardsContainer.addCard() })
    .catch((err) => {
      console.error(`Ошибка рендеринга карточек: ${err}`)})


