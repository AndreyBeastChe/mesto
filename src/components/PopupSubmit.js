import { Popup } from "./Popup.js";

export class PopupSubmit extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._form = this._popup.querySelector(".popup__content");
    this._submitButton = this._form.querySelector(".popup__save");
  }

  _handleSubmitPopup(evt) {
    evt.preventDefault();
    this._submit();
  }

  updateSubmit(func) {
    this._submit = func;
  }

  setLoadingText(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      this._handleSubmitPopup(evt);
    });
  }
}
