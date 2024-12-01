import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";    
import { createCard }  from "./card.js";
import { enableValidation } from "./validate.js";

import arkhyzImage from "../images/arkhyz.jpg";
import baikalImage from "../images/baikal.jpg";
import chelyabinskImage from "../images/chelyabinsk-oblast.jpg";
import ivanovoImage from "../images/ivanovo.jpg";
import kamchatkaImage from "../images/kamchatka.jpg";
import kholmogorskyImage from "../images/kholmogorsky-rayon.jpg";

const initialCards = [
    {name: "Архыз", link: arkhyzImage},
    {name: "Челябинская область", link: chelyabinskImage},
    {name: "Иваново", link: ivanovoImage},
    {name: "Камчатка", link: kamchatkaImage},
    {name: "Холмогорский район", link: kholmogorskyImage},
    {name: "Байкал", link: baikalImage},
];

export const popupImage = document.querySelector(".popup_type_image");
export const popupClose = popupImage.querySelector(".popup__close");
export const popupImageElement = popupImage.querySelector(".popup__image");
export const popupCaption = popupImage.querySelector(".popup__caption");
const cardPopup = document.querySelector(".popup_type_new-card");

const editButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

const addProfileButton = document.querySelector(".profile__add-button");
const cardFormElement = cardPopup.querySelector('.popup__form');

import avatar from '../images/avatar.jpg';
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

const popupAnimation = document.querySelectorAll('.popup');
popupAnimation.forEach(popup => {
    popup.classList.add('popup_is-animated');
});

popupAnimation.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
        if (
            evt.target.classList.contains("popup_is-opened") ||
            evt.target.classList.contains("popup__close")
        ) {
            closePopup(popup);
        }
    });
});

function renderCards(){
    const placesList = document.querySelector(".places__list");

    initialCards.forEach(cardData => {
        const card = createCard(cardData);
        placesList.append(card);

    });
}
renderCards();

// @todo: DOM узлы
editButton.addEventListener('click', function() {
    const name = document.querySelector('.profile__title').textContent; 
    const job = document.querySelector('.profile__description').textContent; 

    nameInput.value = name;
    jobInput.value = job;

    openPopup(profilePopup);
});

const closeProfile = profilePopup.querySelector('.popup__close');   
closeProfile.addEventListener('click', () => {
    closePopup(profilePopup);
});

const closeCardPopup = cardPopup.querySelector('.popup__close');
closeCardPopup.addEventListener('click', () => {
    closePopup(cardPopup);
});

addProfileButton.addEventListener('click', () => {
    cardFormElement.reset();
    openPopup(cardPopup);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    const newName = nameInput.value;
    const newJob = jobInput.value;
    
    document.querySelector('.profile__title').textContent = newName;
    document.querySelector('.profile__description').textContent = newJob;

    closePopup(profilePopup);
}
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const placeName = cardFormElement.querySelector('.popup__input_type_card-name').value;
    const placeLink = cardFormElement.querySelector('.popup__input_type_url').value;

    const newCardData = { name: placeName, link: placeLink }; 
    const newCard = createCard(newCardData);  
    const cardsContainer = document.querySelector('.places__list');
    cardsContainer.prepend(newCard);
    closePopup(cardPopup);
}
cardFormElement.addEventListener('submit', handleCardFormSubmit);

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

  
  enableValidation(validationSettings);

const errorElements = document.querySelectorAll('[class*="-error"]');

errorElements.forEach((element) => {
    element.style.color = 'rgba(255, 0, 0, 1)'; 
    element.style.fontSize = '12px';
});



