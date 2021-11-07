let popupElement = document.querySelector(".popup");
const popupAddElement = document.querySelector(".popup_type_new-card");
const popupEditElement = document.querySelector(".popup_type_edit");
const popupPhotoElement = document.querySelector(".popup_type_photo");
const popupOpenButtonEditPopup = document.querySelector(
  ".profile__edit-button"
);
const popupOpenButtonAddPopup = document.querySelector(".profile__add-button");
const placecGrid = document.querySelector(".places__grid");
const placeTemplate = document.querySelector("#place");
let profileName = document.querySelector(".profile__name");
let jobName = document.querySelector(".profile__description");
let nameInput = popupElement.querySelector(".popup__input_type_name");
let jobInput = popupElement.querySelector(".popup__input_type_profession");
const placeInput = document.querySelector("[name=placeInput]");
const linkInput = document.querySelector("[name=linkInput]");
const popupEditCloseButtonElement =
  popupEditElement.querySelector(".popup__close");
const popupAddCloseButtonElement =
  popupAddElement.querySelector(".popup__close");
const popupFullscriinCloseButtonElement =
  popupPhotoElement.querySelector(".popup__close");
let fotoPopup = popupPhotoElement.querySelector(".popup_type_photo-fullscreen");
let namePopup = popupPhotoElement.querySelector(".popup_type_photo-name");
let newPlace = {};

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function main() {
  initialCards.forEach((element) => {
    renderItem(element);
  });
}

function renderItem(element) {
  let placeElement = placeTemplate.content
    .querySelector(".place")
    .cloneNode(true);
  (placeElement.querySelector(".place__title").textContent = element.name),
    (placeElement.querySelector(".place__foto").src = element.link),
    elementListeners(placeElement);
  placecGrid.appendChild(placeElement);
}

function elementListeners(element) {
  element.querySelector(".place__like").addEventListener("click", likeElement);
  element
    .querySelector(".place__delete")
    .addEventListener("click", deleteElement);
  element.querySelector(".place__foto").addEventListener("click", () => {
    openFullscriinPlace(element);
  });
}

const likeElement = function (event) {
  event.target.classList.toggle("place__like_active");
};

const deleteElement = function (event) {
  event.target.closest(".place").remove();
};

main();
const openPopup = function (popupElement) {
  popupElement.classList.add("popup_opened");
};

const closePopup = function (popupElement) {
  popupElement.classList.remove("popup_opened");
};

function openEditPopup(popupElement) {
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
  openPopup(popupElement);
}

function openAddPopup(popupElement) {
  openPopup(popupElement);
}

function openFullscriinPlace(el) {
  fotoPopup.src = el.querySelector(".place__foto").src;
  namePopup.textContent = el.querySelector(".place__title").textContent;
  openPopup(popupPhotoElement);
}

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;
  closePopup(popupEditElement);
}

function addCard(evt) {
  evt.preventDefault();
  newPlace.name = placeInput.value;
  newPlace.link = linkInput.value;
  renderItem(newPlace);
  placeInput.value = null;
  linkInput.value = null;
  closePopup(popupAddElement);
}

popupOpenButtonEditPopup.addEventListener("click", () => {
  openEditPopup(popupEditElement);
});
popupOpenButtonAddPopup.addEventListener("click", () => {
  openAddPopup(popupAddElement);
});
popupEditCloseButtonElement.addEventListener("click", () => {
  closePopup(popupEditElement);
});
popupAddCloseButtonElement.addEventListener("click", () => {
  closePopup(popupAddElement);
});
popupFullscriinCloseButtonElement.addEventListener("click", () => {
  closePopup(popupPhotoElement);
});
popupEditElement.addEventListener("submit", editProfile);
popupAddElement.addEventListener("submit", addCard);
