import "../pages/index.css";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidation } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupSubmit } from "../components/PopupSubmit.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import {
  popupOpenButtonEditPopup,
  popupOpenButtonAddPopup,
  popupOpenButtonEditUserPopup,
  placecGrid,
  nameInput,
  jobInput,
  formValidators,
  load,
  config,
} from "../utils/constants.js";

const section = new Section(
  {
    renderer: (element) => {
      const userId = element.owner._id;
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
  formValidators[avatarForm.name].disableButton();
  popupEditUser.openPopup();
});

function handleSubmitEditPopup(data) {
  popupEditPopup.setLoadingText(load);
  api
    .setUser({ name: data.nameInput, about: data.jobInput })
    .then(() => {
      userInfo.setUserInfo(data.nameInput, data.jobInput);
      popupEditPopup.closePopup();
      formValidators[profileForm.name].disableButton();
    })
    .catch((err) => console.log("Ошибка изменения имени и профессии " + err))
    .finally(() => popupEditPopup.setLoadingText("Сохранить"));
}

function handleSubmitAddCard(data) {
  popupAddPopup.setLoadingText(load);
  api
    .addCard({ name: data.placeInput, link: data.linkInput })
    .then((res) => {
      const infoCards = [];
      infoCards.push(res);
      section.renderItems(infoCards);
      popupAddPopup.closePopup();
    })
    .catch((err) => console.log("Ошибка добавления новой карточки " + err))
    .finally(() => popupAddPopup.setLoadingText("Создать"));
}

function handleSubmitUserPopup(data) {
  popupEditUser.setLoadingText(load);
  api
    .changeAvatar(data.avatarInput)
    .then(() => {
      userInfo.setUserAvatar(data.avatarInput);
      popupEditUser.closePopup();
      formValidators[avatarForm.name].disableButton();
    })
    .catch((err) => console.log("Ошибка изменения аватара" + err))
    .finally(() => popupEditUser.setLoadingText("Сохранить"));
}

const popupWithImage = new PopupWithImage(".popup_type_photo");
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.openPopup(name, link);
}

const popupDelSubmit = new PopupSubmit(".popup_type_submit", (data) =>
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
        popupDelSubmit.closePopup();
      })
      .catch((err) => console.log("Ошибка удаления элемента" + err))
      .finally(() => popupDelSubmit.setLoadingText("Да"));
  });
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

Promise.all([api.getUser(), api.gerCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setUserAvatar(user.avatar);
    section.renderItems(cards);
  })
  .catch((err) => console.log("Ошибка инициализации" + err));

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
