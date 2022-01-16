export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closeButton = this._popup.querySelector(".popup__close");
  }

  _handleEscClose(event) {
    {
      if (event.key === "Escape") {
        this.closePopup();
      }
    }
  }
  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", () => this._handleEscClose(event));
    this._popup.addEventListener("click", () =>
      this._handleByClickOverlay(event)
    );
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", () => this._handleEscClose());
    this._popup.removeEventListener("click", () =>
      this._handleByClickOverlay()
    );
  }

  _handleByClickOverlay(event) {
    if (event.target === event.currentTarget) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.closePopup();
    });
  }
}
