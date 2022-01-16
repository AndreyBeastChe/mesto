export class Card {
  constructor(element, selector, handleCardClick) {
    this._title = element.name;
    this._link = element.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
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

  _setEventListeners() {
    this._view.querySelector(".place__foto").addEventListener("click", () => {
      this._handleCardClick(this._title, this._link);
    });
    this._view
      .querySelector(".place__like")
      .addEventListener("click", this._likeElement);
    this._view
      .querySelector(".place__delete")
      .addEventListener("click", this._deleteElement);
  }
}
