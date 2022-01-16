import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._form = this._popup.querySelector(".popup__content");
    this._submitButton = this._form.querySelector(".popup__save");
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _handleSubmitPopup(evt) {
    evt.preventDefault();
    this._submit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      debugger;
      this._handleSubmitPopup(evt);
    });
  }

  closePopup() {
    super.closePopup();
    this._inputList.forEach((input) => {
      input.value = "";
    });
  }
}
