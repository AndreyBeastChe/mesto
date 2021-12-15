import { openPopup, popupPhotoElement, fotoPopup, namePopup } from "./index.js";


export class Card {
    constructor(title, link, selector) {
        this._title = title;
        this._link = link;
        this._selector = selector;
    } 


    createCard() {
        this._selector.querySelector(".place__title").textContent = this._title;
        this._selector.querySelector(".place__foto").src = this._link;
        this._selector.querySelector(".place__foto").alt = this._title;
        this._selector.querySelector(".place__like").addEventListener('click', this._likeElement);
        this._selector.querySelector(".place__delete").addEventListener('click', this._deleteElement);
        this._selector.querySelector(".place__foto").addEventListener("click", () => {this._openFullscreenPlace()});
        return this._selector
      }

    _likeElement(event) {
        event.target.classList.toggle("place__like_active");
      };
      
    _deleteElement(event) {
        event.target.closest(".place").remove();
      };

    _openFullscreenPlace() {
        fotoPopup.src = this._selector.querySelector(".place__foto").src;
        namePopup.textContent = this._selector.querySelector(".place__title").textContent;
        fotoPopup.alt = this._selector.querySelector(".place__title").textContent;
        openPopup(popupPhotoElement);
      }

}