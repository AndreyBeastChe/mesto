import "../pages/index.css";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidation } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";

const popupAddElement = document.querySelector(".popup_type_new-card");
const popupEditElement = document.querySelector(".popup_type_edit");
const popupEditUserElement = document.querySelector(".popup_type_user");
const popupOpenButtonEditPopup = document.querySelector(
  ".profile__edit-button"
);
const popupOpenButtonAddPopup = document.querySelector(".profile__add-button");
const popupOpenButtonEditUserPopup = document.querySelector(".profile__avatar");
const placecGrid = document.querySelector(".places__grid");
const nameInput = popupEditElement.querySelector(".popup__input_type_name");
const jobInput = popupEditElement.querySelector(
  ".popup__input_type_profession"
);
const placeInput = popupAddElement.querySelector("[name=placeInput]");
const linkInput = popupAddElement.querySelector("[name=linkInput]");
const avatarInput = popupEditUserElement.querySelector("[name=avatarInput]");
const formValidators = {};
const load = "Сохранение...";

const config = {
  formSelector: ".popup__content",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function createItems(items, userId) {
  const section = new Section(
    {
      items: items,
      renderer: (element) => {
        const card = new Card(
          element,
          "#place",
          userId,
          handleCardClick,
          handleLikeClick,
          handleDelClick
        );
        section.addItem(card.createElement());
      },
    },
    placecGrid
  );
  section.renderItems();
}

const popupAddPopup = new PopupWithForm(".popup_type_new-card", (data) =>
  handleSubmitAddCard(data)
);
popupAddPopup.setEventListeners();

const popupEditPopup = new PopupWithForm(".popup_type_edit", (data) =>
  handleSubmitEditPopup(data)
);
popupEditPopup.setEventListeners();

const popupEditUser = new PopupWithForm(".popup_type_user", (data) =>
  handleSubmitUserPopup(data)
);
popupEditUser.setEventListeners();

const userInfo = new UserInfo({
  name: ".profile__name",
  profession: ".profile__description",
  avatar: ".profile__avatar",
});

popupOpenButtonEditPopup.addEventListener("click", () => {
  formValidators[profileForm.name].disableButton();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.profession;
  popupEditPopup.openPopup();
});

popupOpenButtonAddPopup.addEventListener("click", () => {
  formValidators[addCardForm.name].disableButton();
  popupAddPopup.openPopup();
});

popupOpenButtonEditUserPopup.addEventListener("click", () => {
  formValidators[addCardForm.name].disableButton();
  popupEditUser.openPopup();
});

function handleSubmitEditPopup(data) {
  popupEditPopup.setLoadingText(load);
  api
    .setUser({ name: data.nameInput, about: data.jobInput })
    .then(() => {
      userInfo.setUserInfo(data.nameInput, data.jobInput);
    })
    .catch((err) => console.log("Ошибка изменения имени и профессии " + err))
    .finally(() => popupEditPopup.closePopup());
  formValidators[profileForm.name].disableButton();
  popupEditPopup.setLoadingText("Сохранить");
}

function handleSubmitAddCard(data) {
  popupAddPopup.setLoadingText(load);
  api
    .addCard({ name: data.placeInput, link: data.linkInput })
    .then((res) => {
      const infoCards = [];
      infoCards.push(res);
      createItems(infoCards, res.owner._id);
    })
    .catch((err) => console.log("Ошибка добавления новой карточки " + err))
    .finally(() => popupAddPopup.closePopup());
  popupAddPopup.setLoadingText("Создать");
}

function handleSubmitUserPopup(data) {
  popupEditUser.setLoadingText(load);
  api
    .changeAvatar(data.avatarInput)
    .then(() => {
      userInfo.setUserAvatar(data.avatarInput);
    })
    .catch((err) => console.log("Ошибка изменения аватара" + err))
    .finally(() => popupEditUser.closePopup());
  popupEditUser.setLoadingText(load);
  formValidators[avatarForm.name].disableButton();
}

const popupWithImage = new PopupWithImage(".popup_type_photo");
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.openPopup(name, link);
}

const popupDelSubmit = new PopupWithForm(".popup_type_submit", (data) =>
  handleDelClick(data)
);
popupDelSubmit.setEventListeners();

function handleDelClick(card) {
  popupDelSubmit.openPopup();
  popupDelSubmit.updateSubmit(() => {
    popupDelSubmit.setLoadingText(load);
    api
      .deleteCard(card._id)
      .then(() => {
        card.delete(card._id);
      })
      .catch((err) => console.log("Ошибка удаления элемента" + err))
      .finally(() => popupDelSubmit.closePopup());
  });
  popupDelSubmit.setLoadingText("Да");
}

function handleLikeClick(card) {
  if (card.isLiked()) {
    api
      .dislikeCard(card._id)
      .then((res) => {
        card.setLike(res.likes);
      })
      .catch((err) => console.log("Ошибка лайка элемента" + err));
  } else {
    api
      .likeCard(card._id)
      .then((res) => {
        card.setLike(res.likes);
      })
      .catch((err) => console.log("Ошибка лайка элемента" + err));
  }
}

Promise.all([api.getUser(), api.gerCards()]).then(([user, card]) => {
  const userId = user._id;
  userInfo.setUserInfo(user.name, user.about);
  userInfo.setUserAvatar(user.avatar);
  createItems(card, userId);
});

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
