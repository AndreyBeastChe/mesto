import "../pages/index.css";
import { Card } from "../components/Card.js";
import { Popup } from "../components/Popup.js";
import { Section } from "../components/Section.js";
import { FormValidation } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const popupAddElement = document.querySelector(".popup_type_new-card");
const popupEditElement = document.querySelector(".popup_type_edit");
const popupPhotoElement = document.querySelector(".popup_type_photo");
const popupContentEditPopup = popupEditElement.querySelector(".popup__content");
const popupContentAddPopup = popupAddElement.querySelector(".popup__content");
const popupOpenButtonEditPopup = document.querySelector(
  ".profile__edit-button"
);
const popupOpenButtonAddPopup = document.querySelector(".profile__add-button");
const placecGrid = document.querySelector(".places__grid");
const placeTemplate = document.querySelector("#place");
const nameInput = popupEditElement.querySelector(".popup__input_type_name");
const jobInput = popupEditElement.querySelector(
  ".popup__input_type_profession"
);
const placeInput = popupAddElement.querySelector("[name=placeInput]");
const linkInput = popupAddElement.querySelector("[name=linkInput]");
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

const section = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const card = new Card(element, "#place", handleCardClick);
      section.addItem(card.createElement());
    },
  },
  placecGrid
);
section.renderItems();

const popupAddPopup = new PopupWithForm(".popup_type_new-card", (data) =>
  handleSubmitAddCard(data)
);
popupAddPopup.setEventListeners();

const popupEditPopup = new PopupWithForm(".popup_type_edit", (data) =>
  handleSubmitEditPopup(data)
);
popupEditPopup.setEventListeners();

const userInfo = new UserInfo({
  name: ".profile__name",
  profession: ".profile__description",
});

popupOpenButtonEditPopup.addEventListener("click", () => {
  formValidators[profileForm.name].disableButton();
  userInfo.getUserInfo();
  nameInput.value = userInfo.userData.name;
  jobInput.value = userInfo.userData.profession;
  popupEditPopup.openPopup();
});

popupOpenButtonAddPopup.addEventListener("click", () => {
  formValidators[addCardForm.name].disableButton();
  popupAddPopup.openPopup();
});

function handleSubmitEditPopup(data) {
  const inputPopup = data;
  userInfo.setUserInfo(inputPopup.nameInput, inputPopup.jobInput);
  popupEditPopup.closePopup();
  formValidators[profileForm.name].disableButton();
}

function handleSubmitAddCard(data) {
  const infoCard = { name: "", link: "" };
  infoCard.name = data.placeInput;
  infoCard.link = data.linkInput;
  section.renderItem(infoCard);
  popupAddPopup.closePopup();
}

const popupWithImage = new PopupWithImage(".popup_type_photo");
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.openPopup(name, link);
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
