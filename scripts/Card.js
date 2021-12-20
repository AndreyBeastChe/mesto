import { openPopup, popupPhotoElement, fotoPopup, namePopup } from "./index.js";

export class Card {
  constructor(title, link, selector) {
    this._title = title;
    this._link = link;
    this._selector = selector;
  }

  _getTemplate() {
    this.placeTemplate = document.querySelector(this._selector).content;
    this._view = this.placeTemplate.cloneNode(true);
  }

  createElement() {
    this._getTemplate();
    this._view.querySelector(".place__title").textContent = this._title;
    this._view.querySelector(".place__foto").src = this._link;
    this._view.querySelector(".place__foto").alt = this._title;
    this._setEventListeners();
    return this._view;
  }

  _likeElement(event) {
    event.target.classList.toggle("place__like_active");
  }

  _deleteElement(event) {
    event.target.closest(".place").remove();
  }

  _openFullscreenPlace() {
    fotoPopup.src = this._link;
    namePopup.textContent = this._title;
    fotoPopup.alt = this._title;
    openPopup(popupPhotoElement);
  }

  _setEventListeners() {
    this._view
      .querySelector(".place__like")
      .addEventListener("click", this._likeElement);
    this._view
      .querySelector(".place__delete")
      .addEventListener("click", this._deleteElement);
    this._view.querySelector(".place__foto").addEventListener("click", () => {
      this._openFullscreenPlace();
    });
  }
}
