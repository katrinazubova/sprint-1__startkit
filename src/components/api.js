import baseAvatar from "../images/avatar.jpg";

const config = {
    baseUrl: 'https://mesto.nomoreparties.co./v1/frontend-st-cohort-201',
    headers: {
      authorization: '30dc644b-978b-4717-b5df-b62d00d6ab72',
      'Content-Type': 'application/json'
    },
  };

function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
    .then((res) => getResponseData(res));    
} 

function postCards(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        method: "POST",
        body: JSON.stringify({
            name: name,
            link: link,
        }),
    })
    .then((res) => getResponseData(res));
}


function getAboutMe() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
    .then((res) => getResponseData(res));
}
 
function patchProfile(name, description) {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        method: "PATCH",
        body: JSON.stringify({
            name: name,
            about: description,
        }),
    })
    .then((res) => getResponseData(res));
}

function deleteCards(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        headers: config.headers,
        method: "DELETE",
    })
    .then((res) => getResponseData(res));
}

function putLikes(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: "PUT",
    })
    .then((res) => getResponseData(res));
}

function deleteLikes(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: "DELETE",
    })
    .then((res) => getResponseData(res));
}

function patchAvatar(link) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        headers: config.headers,
        method: "PATCH",
        body: JSON.stringify({
            avatar: link,
        }),
    })
    .then((res) => getResponseData(res));
}

function getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  }

const baseUser = {
    name: "Жак-Ив Кусто",
    about: "Исследователь океана",
    avatar: baseAvatar,
    _id: "-1",
  };

export {getInitialCards, postCards, getAboutMe, patchProfile, deleteCards, putLikes, deleteLikes, patchAvatar, baseUser};