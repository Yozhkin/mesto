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

// контейнер с картами(фото)
const cardsContainer = document.querySelector('.elements__container');
const templateCard = document.querySelector('#template-cards').content;

//Функция открытия попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
};

//Функция закрытия попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
};

// Закрытие попап на крестик
popupCloseButtons.forEach((button) => {
  const popupClose = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popupClose));
});

// Фунция закрытие попап overlay
function closePopupByClickOverlay(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }
    closePopup(evt.target);
  };

// Закрытие попап overlay
popupElements.forEach((overlay) => {
  overlay.addEventListener('click', (evt) => closePopupByClickOverlay(evt));
});

// Закрытие попап при нажатии на 'Esc'
function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened)
  };
};

// Создаем карточку
function createCard(data) {
  const newCard = templateCard.querySelector('.elements__card').cloneNode(true);
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

  const zoomFoto = newCard;
  zoomFoto.addEventListener('click', () => {
    popupZoomImg.src = newCard.src = data.link;
    popupZoomImg.alt = newCard.alt = data.name;
    popupZoomTitle.textContent = newCard.name = data.name;
    openPopup(popupZoomElement)
  });

  return newCard;
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardsContainer.prepend(cardElement);
};

// Открытие попап карт
popupButtonAddElement.addEventListener('click', () => {
  openPopup(popupAddCardElement);
});

// Добавляем начальные карточки
initialCards.forEach(function(card) {
  renderCard(card);
});

// Сабмит карточки через попап
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const card  = {name: popupInputTitleCard.value, link: popupInputLinkCard.value};
  renderCard(card);
  evt.target.reset();
  closePopup(popupAddCardElement);
};

formAddCardElement.addEventListener('submit', handleFormSubmitCard);

// Открытие попап профиля
popupButtonEditElement.addEventListener('click', () => {
  popupInputNameElement.value = profileNameElement.textContent;
  popupInputJobElement.value = profileJobElement.textContent;
  openPopup(popupProfileElement);
});

// Сабмит профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileNameElement.textContent = popupInputNameElement.value;
  profileJobElement.textContent = popupInputJobElement.value;
  closePopup(popupProfileElement);
};

formProfileElement.addEventListener('submit', handleFormSubmitProfile);

