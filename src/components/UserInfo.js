export class UserInfo {
  constructor(data) {
    this._nameSelector = data.name;
    this._professionSelector = data.profession;
    this._name = document.querySelector(this._nameSelector);
    this._profession = document.querySelector(this._professionSelector);
  }
  getUserInfo() {
    this.userData = {};
    this.userData.name = this._name.textContent;
    this.userData.profession = this._profession.textContent;
    return this.userData;
  }

  setUserInfo(name, job) {
    this._name.textContent = name;
    this._profession.textContent = job;
  }
}
