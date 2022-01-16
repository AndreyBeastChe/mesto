export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  _handleEscClose = (evt) => {
    if (event.key === "Escape") {
      this.closePopup();
    }
  };

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
        this.closePopup();
      }
    });
  }
}
