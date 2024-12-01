import { openPopup, closePopup } from "./modal.js";
import { popupImageElement, popupCaption, popupImage, popupClose } from './index.js';


function createCard(cardData){
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__title").textContent = cardData.name;
    const imageElement = cardElement.querySelector(".card__image");
    imageElement.alt = cardData.name;
    imageElement.src = cardData.link;

    imageElement.addEventListener("click", function() {
        popupImageElement.src = cardData.link;
        popupCaption.textContent = cardData.name;
        openPopup(popupImage);
    });

    popupClose.addEventListener('click', () => closePopup(popupImage));

    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector(".card__delete-button");

    likeButton.addEventListener('click', function() {
        toggleLike(likeButton); 
    });
    
    deleteButton.addEventListener('click', function() {
        resetButton(deleteButton);
    });   

    return cardElement; 
}

function toggleLike(button) {
    button.classList.toggle('card__like-button_is-active');
}

function resetButton(button) {
    const card = button.closest('.card'); 
        if (card) {
            card.remove(); 
        }
}

export {createCard};