import { openPopup, closePopup } from "./modal.js";
import { deleteCards, putLikes, deleteLikes} from './api.js';

const deleteCardPopup = document.querySelector(".popup_type_remove_card");
const deleteCardButton = deleteCardPopup.querySelector(".popup__button");

function createCard(card, user, delCard, likeCard, openImage) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const likeCounter = cardElement.querySelector(".card__like-counter");

    cardElement.querySelector(".card__title").textContent = card.name;
    const imageElement = cardElement.querySelector(".card__image");
    imageElement.alt = card.name;
    imageElement.src = card.link;
    cardElement.id = card._id;

    imageElement.addEventListener('click', () => openImage(card));

    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector(".card__delete-button");

    likeButton.addEventListener('click', function() {
        likeCard(likeButton, card, likeCounter);
    });
    
    deleteButton.addEventListener('click', function() {
        delCard(card);
    });   

    likeCounter.textContent = card.likes.length;

    if (card.owner._id !== user._id) {
        deleteButton.remove();
    }

    if (card.likes.some((like) => like._id === user._id)) {
        likeButton.classList.add("card__like-button_is-active");
    }   

    return cardElement;
}

deleteCardPopup.addEventListener("submit", (evt) => {
    evt.preventDefault();
  
    const card_id = deleteCardPopup.dataset.cardId;
  
    deleteCardButton.textContent = "Удаление...";
  
    deleteCards(card_id)
      .then(() => {
        document.getElementById(card_id).remove();
        deleteCardPopup.dataset.cardId = "";
        closePopup(deleteCardPopup);
      })
      .catch((err) => console.log(`Ошибка удаления карточки ${err}`))
      .finally(() => deleteCardButton.textContent = "Да");
  });

function toggleLike(likeButton, card, likeCounter) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    if (isLiked) {
        deleteLikes(card._id)
          .then((res) => {
            likeButton.classList.remove("card__like-button_is-active");
            likeCounter.textContent = res.likes.length;
          })
          .catch((err) => console.log(`Ошибка удаления лайка карточки ${err}`));
      } 
    else {
        putLikes(card._id)
          .then((res) => {
            likeButton.classList.add("card__like-button_is-active");
            likeCounter.textContent = res.likes.length;
          })
          .catch((err) => console.log(`Ошибка лайка карточки ${err}`));
      }
}

function resetButton(card) {
    openPopup(deleteCardPopup);
    deleteCardPopup.dataset.cardId = card._id;
}

export {createCard, toggleLike, resetButton};