import { Card } from "./Card.js";
import { FormValidation } from "./FormValidator.js";

const popupAddElement = document.querySelector(".popup_type_new-card");
const popupEditElement = document.querySelector(".popup_type_edit");
export const popupPhotoElement = document.querySelector(".popup_type_photo");
const popupContentEditPopup = popupEditElement.querySelector(".popup__content");
const popupContentAddPopup = popupAddElement.querySelector(".popup__content");
const popupOpenButtonEditPopup = document.querySelector(
  ".profile__edit-button"
);
const popupOpenButtonAddPopup = document.querySelector(".profile__add-button");
const placecGrid = document.querySelector(".places__grid");
const placeTemplate = document.querySelector("#place");
const profileName = document.querySelector(".profile__name");
const jobName = document.querySelector(".profile__description");
const nameInput = popupEditElement.querySelector(".popup__input_type_name");
const jobInput = popupEditElement.querySelector(
  ".popup__input_type_profession"
);
const placeInput = popupAddElement.querySelector("[name=placeInput]");
const linkInput = popupAddElement.querySelector("[name=linkInput]");
const popupEditCloseButtonElement =
  popupEditElement.querySelector(".popup__close");
const popupAddCloseButtonElement =
  popupAddElement.querySelector(".popup__close");
const popupFullscriinCloseButtonElement =
  popupPhotoElement.querySelector(".popup__close");
export const fotoPopup = popupPhotoElement.querySelector(".popup__fullscreen");
export const namePopup = popupPhotoElement.querySelector(".popup__name");
const newPlace = {};
const formValidators = {};
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

const config = {
  formSelector: ".popup__content",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function renderInitialArray() {
  initialCards.reverse().forEach((element) => {
    insertCard(element);
  });
}
renderInitialArray();

function createCard(element) {
  const placeElement = new Card(element.name, element.link, "#place");
  return placeElement;
}

function insertCard(element) {
  placecGrid.prepend(createCard(element).createElement());
}

export const openPopup = function (popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupClickEsc);
};

const closePopup = function (popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupClickEsc);
};

const closePopupClickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  const popupElement = document.querySelector(".popup_opened");
  closePopup(popupElement);
};

const closePopupClickEsc = function (event) {
  if (event.key === "Escape") {
    const popupElement = document.querySelector(".popup_opened");
    closePopup(popupElement);
  }
};

function openEditPopup(popupElement) {
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
  formValidators[profileForm.name].enableValidation();
  openPopup(popupElement);
}

function openAddPopup(popupElement) {
  formValidators[addCardForm.name].enableValidation();
  openPopup(popupElement);
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
  insertCard(newPlace);
  placeInput.value = "";
  linkInput.value = "";
  closePopup(popupAddElement);
}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidation(config, formElement);
    // вот тут в объект записываем под именем формы
    formValidators[formElement.name] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

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
popupContentEditPopup.addEventListener("submit", editProfile);
popupContentAddPopup.addEventListener("submit", addCard);

popupEditElement.addEventListener("click", closePopupClickOverlay);
popupAddElement.addEventListener("click", closePopupClickOverlay);
popupPhotoElement.addEventListener("click", closePopupClickOverlay);
