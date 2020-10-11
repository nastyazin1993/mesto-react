
class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponseData(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status} ....`));
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(res => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers,
    }).then(res => this._getResponseData(res));
  }

  deleteCard(url) {
    return fetch(`${this._url}cards/` + url, {
      method: "DELETE",
      headers: this._headers,
    }).then(res => this._getResponseData(res));
  }

  patchUserInfo({name, about}) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({name, about}
      
      ),
    }).then(res => this._getResponseData(res));
  }

  postCard({ name, link }) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      }),
    }).then(res => this._getResponseData(res));
  }

  getSumLikes() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers
    }).then(res => this._getResponseData(res));
  }

  deleteLike(id) {
    return fetch(`${this._url}cards/likes/` + id, {
      method: "DELETE",
      headers: this._headers
      
    }).then(res => this._getResponseData(res));
  }

  putLike(url) {
    return fetch(`${this._url}cards/likes/` + url, {
      method: "PUT",
      headers: this._headers
    }).then(res => this._getResponseData(res));
  }

  patchUserAvatar({avatar}) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      })
    }).then(res => this._getResponseData(res));
  }

}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-15/",
  headers: {
    "Content-Type": "application/json",
    authorization: "4426ae37-9ae5-4337-9bcb-53d589589107",
  },
});

export default api;
