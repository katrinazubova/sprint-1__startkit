import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";    
import { createCard, toggleLike, resetButton }  from "./card.js";
import { enableValidation } from "./validate.js";
import {getInitialCards, postCards, getAboutMe, patchProfile, patchAvatar, baseUser} from "./api.js";
import arkhyzImage from "../images/arkhyz.jpg";
import baikalImage from "../images/baikal.jpg";
import chelyabinskImage from "../images/chelyabinsk-oblast.jpg";
import ivanovoImage from "../images/ivanovo.jpg";
import kamchatkaImage from "../images/kamchatka.jpg";
import kholmogorskyImage from "../images/kholmogorsky-rayon.jpg";

const initialCards = [
    {name: "Архыз", link: arkhyzImage, owner: {_id: "-1" }},
    {name: "Челябинская область", link: chelyabinskImage, owner: {_id: "-1" }},
    {name: "Иваново", link: ivanovoImage,owner: {_id: "-1" }},
    {name: "Камчатка", link: kamchatkaImage, owner: {_id: "-1" }},
    {name: "Холмогорский район", link: kholmogorskyImage, owner: {_id: "-1" }},
    {name: "Байкал", link: baikalImage, owner: {_id: "-2" }},
];

const popupImage = document.querySelector(".popup_type_image");
const popupClose = popupImage.querySelector(".popup__close");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const editProfileButton = profilePopup.querySelector('.popup__button');

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector('.profile__image');

const avatarEditButton = document.querySelector(".profile__avatar-button");
const avatarEditPopup = document.querySelector(".popup_type_edit_avatar");
const avatarEditForm = avatarEditPopup.querySelector(".popup__form");
const avatarLinkInput = avatarEditPopup.querySelector(".popup__input_type_url");
const avatarLink = document.querySelector(".profile__image");
const avatarSubmitButton = avatarEditPopup.querySelector(".popup__button");


const cardPopup = document.querySelector(".popup_type_new-card");
const addProfileButton = document.querySelector(".profile__add-button");
const cardFormElement = cardPopup.querySelector('.popup__form');
const placeNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const imageLinkInput = cardPopup.querySelector('.popup__input_type_url');
const cardButton = cardPopup.querySelector('.popup__button');


//import avatar from '../images/avatar.jpg';
//document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

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


// @todo: DOM узлы
editButton.addEventListener('click', function() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(profilePopup);
});

profileFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    editProfileButton.textContent = 'Сохранение...';

    patchProfile(nameInput.value, jobInput.value)
        .then((res) => {
            profileTitle.textContent = res.name;
            profileDescription.textContent = res.about;
            closePopup(profilePopup);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            editProfileButton.textContent = 'Сохранить';
        });
});

//const closeProfile = profilePopup.querySelector('.popup__close');   
//closeProfile.addEventListener('click', () => {
 //   closePopup(profilePopup);
//});

//const closeCardPopup = cardPopup.querySelector('.popup__close');
//closeCardPopup.addEventListener('click', () => {
 //   closePopup(cardPopup);
//});

addProfileButton.addEventListener('click', () => {
    openPopup(cardPopup);
});

cardFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    cardButton.textContent = 'Сохранение...';
    postCards(placeNameInput.value, imageLinkInput.value)
        .then((res) => {
            placesList.prepend(
                createCard(res, res.owner, resetButton, toggleLike, openImage)
            );
            cardFormElement.reset();
            closePopup(cardPopup)
        })
        .catch((err) => console.log(err))
        .finally(() => {
            cardButton.textContent = "Сохранить";
        });

});

avatarEditButton.addEventListener('click', () => {
    avatarEditForm.reset();
    openPopup(avatarEditPopup);
})

avatarEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    avatarSubmitButton.textContent = 'Сохранение...'
    patchAvatar(avatarLinkInput.value)
        .then((res) => {
            avatarLink.style.backgroundImage = `url("${res.avatar}")`;
            closePopup(avatarEditPopup);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            avatarEditButton.textContent = "Сохранить";
        });
});
  

//function handleProfileFormSubmit(evt) {
 //   evt.preventDefault(); 

 //   const newName = nameInput.value;
 //   const newJob = jobInput.value;
    
 //   document.querySelector('.profile__title').textContent = newName;
 //   document.querySelector('.profile__description').textContent = newJob;

 //   closePopup(profilePopup);
//}
//profileFormElement.addEventListener('submit', handleProfileFormSubmit);

//function handleCardFormSubmit(evt) {
    //evt.preventDefault();

    //const placeName = cardFormElement.querySelector('.popup__input_type_card-name').value;
    //const placeLink = cardFormElement.querySelector('.popup__input_type_url').value;

    //const newCardData = { name: placeName, link: placeLink }; 
    //const newCard = createCard(newCardData);  
    //const cardsContainer = document.querySelector('.places__list');
    //cardsContainer.prepend(newCard);
    //closePopup(cardPopup);
//}
//cardFormElement.addEventListener('submit', handleCardFormSubmit);

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


Promise.all([getAboutMe(), getInitialCards()])
  .then(([user, cards]) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url("${user.avatar}")`;

    cards.forEach((card) => {
      placesList.append(
        createCard(card, user, resetButton, toggleLike, openImage)
      );
    });
  })
  .catch((err) => {
    console.error("Ошибка получения данных пользователя и карточек:", err);

    profileTitle.textContent = baseUser.name;
    profileDescription.textContent = baseUser.about;
    profileImage.style.backgroundImage = `url("${baseUser.avatar}")`;

    initialCards.forEach((card) => {
      placesList.append(
        createCard(card, baseUser, resetButton, toggleLike, openImage)
      );
    });
  });

function openImage(card) {
    popupImageElement.src = card.link;
    popupImageElement.alt = card.name;
    popupCaption.textContent = card.name;
  
    openPopup(popupImage);
  }