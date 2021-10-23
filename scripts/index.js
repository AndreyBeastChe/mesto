const popupElement = document.querySelector(".popup");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupSaveButtonElement = popupElement.querySelector(".popup__save");
let profileName = document.querySelector(".profile__name");
let jobName = document.querySelector(".profile__description");
let nameInput = popupElement.querySelector(".popup__name");
let jobInput = popupElement.querySelector(".popup__profession");

const openPopup = function () {
  popupElement.classList.add("popup__opened");
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
};

const closePopup = function () {
  popupElement.classList.remove("popup__opened");
};

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;
  closePopup();
}

popupElement.addEventListener("submit", formSubmitHandler);