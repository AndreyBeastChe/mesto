class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._groupId = "cohort-33";
  }

  response(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._url}/${this._groupId}/users/me`, {
      headers: this._headers,
    }).then(this.response);
  }

  setUser({ name, about }) {
    return fetch(`${this._url}/${this._groupId}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this.response);
  }

  gerCards() {
    return fetch(`${this._url}/${this._groupId}/cards`, {
      headers: this._headers,
    }).then(this.response);
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/${this._groupId}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this.response);
  }

  changeAvatar(avatar) {
    return fetch(`${this._url}/${this._groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this.response);
  }

  likeCard(cardId) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this.response);
  }
  dislikeCard(cardId) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.response);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.response);
  }
}

export const api = new Api({
  url: "https://mesto.nomoreparties.co",
  headers: {
    authorization: "3671189f-65d1-4347-8209-095bdf48fd3f",
    "Content-Type": "application/json",
  },
});
