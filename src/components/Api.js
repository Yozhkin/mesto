export default class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
    this._authorization = config.headers.authorization
  }

  _checkServer(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

  getInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
     .then(res => this._checkServer(res))
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(res => this._checkServer(res))
  }

  setUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    })
    .then(res => this._checkServer(res))
  }

  setAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar})
    })
    .then(res => this._checkServer(res))
  }
}
