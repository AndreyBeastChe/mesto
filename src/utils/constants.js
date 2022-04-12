export const popupAddElement = document.querySelector(".popup_type_new-card");
export const popupEditElement = document.querySelector(".popup_type_edit");
export const popupEditUserElement = document.querySelector(".popup_type_user");
export const popupOpenButtonEditPopup = document.querySelector(
  ".profile__edit-button"
);
export const popupOpenButtonAddPopup = document.querySelector(".profile__add-button");
export const popupOpenButtonEditUserPopup = document.querySelector(".profile__avatar");
export const placecGrid = document.querySelector(".places__grid");
export const nameInput = popupEditElement.querySelector(".popup__input_type_name");
export const jobInput = popupEditElement.querySelector(
  ".popup__input_type_profession"
);
export const placeInput = popupAddElement.querySelector("[name=placeInput]");
export const linkInput = popupAddElement.querySelector("[name=linkInput]");
export const avatarInput = popupEditUserElement.querySelector("[name=avatarInput]");
export const formValidators = {};
export const load = "Сохранение...";

export const config = {
  formSelector: ".popup__content",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
