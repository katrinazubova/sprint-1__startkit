// @todo: Темплейт карточки
const popupImage = document.querySelector(".popup_type_image");
const popupClose = popupImage.querySelector(".popup__close");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");
const imagePopup = document.querySelector(".popup_type_image");
const cardPopup = document.querySelector(".popup_type_new-card");

const editButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

const addProfileButton = document.querySelector(".profile__add-button");
const cardFormElement = cardPopup.querySelector('.popup__form');

const popupAnimation = document.querySelectorAll('.popup');
    popupAnimation.forEach(popup => {
        popup.classList.add('popup_is-animated');
    });

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
        openModal(popupImage);
    });

    popupClose.addEventListener('click', () => closeModal(popupImage));

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

    openModal(profilePopup);
});

const closeProfile = profilePopup.querySelector('.popup__close');   
closeProfile.addEventListener('click', () => {
    closeModal(profilePopup);
});

const closeCardPopup = cardPopup.querySelector('.popup__close');
closeCardPopup.addEventListener('click', () => {
    closeModal(cardPopup);
});

addProfileButton.addEventListener('click', () => {
    cardFormElement.reset();
    openModal(cardPopup);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    const newName = nameInput.value;
    const newJob = jobInput.value;
    
    document.querySelector('.profile__title').textContent = newName;
    document.querySelector('.profile__description').textContent = newJob;

    closeModal(profilePopup);
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
    closeModal(cardPopup);
}
cardFormElement.addEventListener('submit', handleCardFormSubmit);

// @todo: Функция создания карточки
function toggleLike(button) {
    button.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
function resetButton(button) {
    const card = button.closest('.card'); 
        if (card) {
            card.remove(); 
        }
}

// @todo: Вывести карточки на страницу
function openModal(modal) {
    modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
    modal.classList.remove("popup_is-opened");
}



