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

const popupElement = document.querySelectorAll('.popup');
const profileNameElement = document.querySelector('.profile__user-name');
const profileJobElement = document.querySelector('.profile__about-user');

// Кнопки открытия попап
const popupButtonEditElement = document.querySelector('.profile__edit-button');
const popupButtonAddElement = document.querySelector('.profile__add-button');

// Попап профиля
const popupProfileElement = document.querySelector('.popup_profile');
const popupProfileButtonClose = popupProfileElement.querySelector('#close_btn_popup_profile');
const popupInputNameElement = popupProfileElement.querySelector('.popup__input_type_name');
const popupInputJobElement = popupProfileElement.querySelector('.popup__input_type_job');
const formProfileElement = popupProfileElement.querySelector('#popup_form_profile');

// Попап добавление фото
const popupAddCardElement = document.querySelector('.popup_addcard');
const popupAddCardButtonClose = popupAddCardElement.querySelector('#close_btn_popup_addcard');
const popupInputTitleCard = popupAddCardElement.querySelector('.popup__input_type_title');
const popupInputLinkCard = popupAddCardElement.querySelector('.popup__input_type_link');
const formAddCardElement = popupAddCardElement.querySelector('#popup_form_addcard');

// Зум фото
const popupZoomElement = document.querySelector('.popup_zoom');
const popupZoomButtonClose = popupZoomElement.querySelector('#close_btn_popup_zoom');
const popupZoomImg = popupZoomElement.querySelector('.popup__foto');
const popupZoomTitle = popupZoomElement.querySelector('.popup__foto-caption');

// контейнер с картами(фото)
const cardsContainer = document.querySelector('.elements__container');
const templateCard = document.querySelector('#template-cards').content;

//Функция открытия попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

//Функция закрытия попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// Создаем карточку
function createCard(data) {
  const newCard = templateCard.cloneNode(true);
  const elementTitle = newCard.querySelector('.elements__title');
  const elementFoto = newCard.querySelector('.elements__foto');
  elementTitle.textContent = data.name;
  elementFoto.src = data.link;
  elementFoto.alt = data.name;

  const deleteBtn = newCard.querySelector('.elements__del-btn');
    deleteBtn.addEventListener('click', (evt) => {
      evt.target.closest('.elements__card').remove();
  });

  const likeBtn = newCard.querySelector('.elements__like');
    likeBtn.addEventListener('click', (evt) => {
      evt.target.classList.toggle('elemetns__like_added');
  });

  const zoomFoto = newCard.querySelector('.elements__foto');
  zoomFoto.addEventListener('click', () => {
    popupZoomImg.src = newCard.src = data.link;
    popupZoomImg.alt = newCard.alt = data.name;
    popupZoomTitle.textContent = newCard.name = data.name;
    openPopup(popupZoomElement)
  });

  return newCard;
}

// закрытие попак Zoom на крестик
popupZoomButtonClose.addEventListener('click', () => {
  closePopup(popupZoomElement)});

function renderCard(data) {
  const cardElement = createCard(data);
  cardsContainer.prepend(cardElement);
};

// Открытие попап карт
popupButtonAddElement.addEventListener('click', () => {
  openPopup(popupAddCardElement);
});

// Закрытие попап карт на кресик
popupAddCardButtonClose.addEventListener('click', () => {
  closePopup(popupAddCardElement)});

// Добавляем начальные карточки
initialCards.forEach(function(card) {
  renderCard(card);
});

// Сабмит карточки через попап
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const card  = {name: popupInputTitleCard.value, link: popupInputLinkCard.value};
  renderCard(card);
  popupInputTitleCard.value = '';
  popupInputLinkCard.value = '';
  closePopup(popupAddCardElement);
};

formAddCardElement.addEventListener('submit', handleFormSubmitCard);

// Открытие попап профиля
popupButtonEditElement.addEventListener('click', () => {
  popupInputNameElement.value = profileNameElement.textContent;
  popupInputJobElement.value = profileJobElement.textContent;
  openPopup(popupProfileElement);
});

// Закрытие попап профиля на крестик
popupProfileButtonClose.addEventListener('click', () => {
  closePopup(popupProfileElement)});

// Сабмит профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileNameElement.textContent = popupInputNameElement.value;
  profileJobElement.textContent = popupInputJobElement.value;
  closePopup(popupProfileElement);
};

formProfileElement.addEventListener('submit', handleFormSubmitProfile);

