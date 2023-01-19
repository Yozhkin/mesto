const popupElement = document.querySelector('.popup');
const popupButtonCloseElement = popupElement.querySelector('.popup__button-close');
const popupButtonEditElement = document.querySelector('.profile__edit-button');
const popupButtonSaveElement = popupElement.querySelector('popup__button-save');
let popupInputNameElement = popupElement.querySelector('.popup__input-name');
let popupInputJobElement = popupElement.querySelector('.popup__input-job');
let formElement = popupElement.querySelector('.popup__input');
let profileNameElement = document.querySelector('.profile__user-name');
let profileJobElement = document.querySelector('.profile__about-user');
const likeAddedElements = document.querySelectorAll('.elements__like');

for (let i = 0; i < likeAddedElements.length; i++) {
  const likeAddedElement = likeAddedElements[i];
  likeAddedElement.addEventListener("click", addLike);
}

function addLike(event)
{
  for (let i = 0; i < likeAddedElements.length; i++) {
  }
  event.target.classList.toggle('elemetns__like_added');
}

function openPopup() {
  popupElement.classList.add('popup_opened');
};

function closePopup() {
  popupElement.classList.remove('popup_opened');
};

function closePopupByClickOverlay(event) {
  if (event.target !== event.currentTarget) {
  return;
}
  closePopup();
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = popupInputNameElement.value;
  profileJobElement.textContent = popupInputJobElement.value;
  popupInputNameElement.value = '';
  popupInputJobElement.value = '';
  closePopup();
};

popupButtonEditElement.addEventListener('click', openPopup);
popupButtonCloseElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOverlay);
formElement.addEventListener('submit', handleFormSubmit);

