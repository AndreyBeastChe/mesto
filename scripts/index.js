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
const fotoPopup = popupPhotoElement.querySelector(".popup__fullscreen");
const namePopup = popupPhotoElement.querySelector(".popup__name");
const newPlace = {};
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

function renderInitialArray() {
  initialCards.reverse().forEach((element) => {
    renderItem(element);
  });
}

function renderItem(element) {
  const placeElement = placeTemplate.content
    .querySelector(".place")
    .cloneNode(true);
  placeElement.querySelector(".place__title").textContent = element.name;
  placeElement.querySelector(".place__foto").src = element.link;
  placeElement.querySelector(".place__foto").alt = element.name
  setCardEventListeners(placeElement);
  addItem(placeElement);
}

function addItem(placeElement) {
  placecGrid.prepend(placeElement);
}

function setCardEventListeners(element) {
  element.querySelector(".place__like").addEventListener("click", likeElement);
  element
    .querySelector(".place__delete")
    .addEventListener("click", deleteElement);
  element.querySelector(".place__foto").addEventListener("click", () => {
    openFullscreenPlace(element);
  });
}

const likeElement = function (event) {
  event.target.classList.toggle("place__like_active");
};

const deleteElement = function (event) {
  event.target.closest(".place").remove();
};

renderInitialArray();
const openPopup = function (popupElement) {
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
  popupElement = document.querySelector(".popup_opened");
  closePopup(popupElement);
};

const closePopupClickEsc = function (event) {
  if (event.key === "Escape") {
    popupElement = document.querySelector(".popup_opened");
    closePopup(popupElement);
  }
};

function openEditPopup(popupElement) {
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
  checkValidation();
  openPopup(popupElement);
}

function openAddPopup(popupElement) {
  openPopup(popupElement);
}

function openFullscreenPlace(el) {
  fotoPopup.src = el.querySelector(".place__foto").src;
  namePopup.textContent = el.querySelector(".place__title").textContent;
  fotoPopup.alt = el.querySelector(".place__title").textContent;
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
  placeInput.value = "";
  linkInput.value = "";
  checkValidation();
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
popupContentEditPopup.addEventListener("submit", editProfile);
popupContentAddPopup.addEventListener("submit", addCard);

popupEditElement.addEventListener("click", closePopupClickOverlay);
popupAddElement.addEventListener("click", closePopupClickOverlay);
popupPhotoElement.addEventListener("click", closePopupClickOverlay);
