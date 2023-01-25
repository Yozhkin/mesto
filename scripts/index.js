const popupElement = document.querySelector('.popup');
const popupButtonCloseElement = popupElement.querySelector('.popup__button-close');
const popupButtonEditElement = document.querySelector('.profile__edit-button');
let popupInputNameElement = popupElement.querySelector('.popup__input_type_name');
let popupInputJobElement = popupElement.querySelector('.popup__input_type_job');
let formElement = popupElement.querySelector('.popup__form');
let profileNameElement = document.querySelector('.profile__user-name');
let profileJobElement = document.querySelector('.profile__about-user');
// const likeAddedElements = document.querySelectorAll('.elements__like');

// Функция кнопки like

// for (let i = 0; i < likeAddedElements.length; i++) {
//   const likeAddedElement = likeAddedElements[i];
//   likeAddedElement.addEventListener("click", addLike);
// }

// function addLike(event)
// {
//   for (let i = 0; i < likeAddedElements.length; i++) {
//   }
//   event.target.classList.toggle('elemetns__like_added');
// }

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
// popupElement.addEventListener('click', closePopupByClickOverlay);
formElement.addEventListener('submit', handleFormSubmit);

