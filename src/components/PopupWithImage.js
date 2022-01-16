import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._foto = this._popup.querySelector(".popup__fullscreen");
    this._title = this._popup.querySelector(".popup__name");
  }

  openPopup(title, link) {
    this._foto.src = link;
    this._title.textContent = title;
    this._foto.alt = title;
    super.openPopup();
  }
}
