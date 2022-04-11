export class Card {
  constructor(
    element,
    selector,
    userId,
    handleCardClick,
    handleLikeClick,
    handleDelClick
  ) {
    this._title = element.name;
    this._link = element.link;
    this._likes = element.likes;
    this._id = element._id;
    this._ownerId = element.owner._id;
    this._userId = userId;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDelClick = handleDelClick;
  }

  _getTemplate() {
    this.placeTemplate = document.querySelector(this._selector).content;
    this._view = this.placeTemplate.cloneNode(true);
    this._likeCounter = this._view.querySelector(".place__like-count");
    this._like = this._view.querySelector(".place__like");
    this._delete = this._view.querySelector(".place__delete");
  }

  createElement() {
    this._getTemplate();
    this._view.querySelector(".place__title").textContent = this._title;
    this._view.querySelector(".place__foto").src = this._link;
    this._view.querySelector(".place__foto").alt = this._title;
    this._toggleLike();
    this._likeCounter.textContent = this._likes.length;
    if (this._ownerId !== this._userId) {
      this._delete.style.display = "none";
    }
    this._setEventListeners();
    return this._view;
  }

  setLike(newLikes) {
    this._likes = newLikes;
    this._likeCounter.textContent = newLikes.length;
    this._toggleLike();
  }

  delete() {
    this._delete.closest(".place").remove();
  }

  _toggleLike() {
    if (this.isLiked()) {
      this._like.classList.add("place__like_active");
    } else {
      this._like.classList.remove("place__like_active");
    }
  }

  isLiked() {
    return this._likes.find((item) => item._id === this._userId);
  }

  _setEventListeners() {
    this._view.querySelector(".place__foto").addEventListener("click", () => {
      this._handleCardClick(this._title, this._link);
    });
    this._view.querySelector(".place__like").addEventListener("click", () => {
      this._handleLikeClick(this);
    });
    this._view.querySelector(".place__delete").addEventListener("click", () => {
      this._handleDelClick(this);
    });
  }
}
