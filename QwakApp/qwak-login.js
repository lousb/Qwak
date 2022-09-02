import {SvgPlus} from "../SvgPlus/4.js"
import {onUserUpdate, signout, sendPhoneNumberCode, confirmPhoneNumberCode, makeCapture} from "../config/firebaseStorigeConfig.js";

export class QwakLogin extends SvgPlus{
  constructor(){
    super("qwak-login");
    this.icon = this.createChild("div", {class: "icon"});
    this.inputForm = this.createChild("div", {class: "input-form"});
    this.recaptcha = this.createChild("div");

    this.icon.onclick = () => {
      if (this.user) {
        signout();
      } else {
        this.signIn();
      }
    }
    onUserUpdate((user) => {
      this.user = user;
      this.clearInput();
    })
  }

  async signIn(){
    if (!this.captcha) {
      this.captcha = makeCapture(this.recaptcha);
    }
    let number = await this.getValue("number");
    let confirmationResult = await sendPhoneNumberCode(number, this.captcha);
    let code = await this.getValue("code");
    let user = await confirmPhoneNumberCode(code, confirmationResult);
    this.clearInput();
    this.user = user;
  }

  clearInput(){this.inputForm.innerHTML = "";}
  async getValue(type) {
    this.inputForm.innerHTML = "";
    let input, submit;
    switch (type) {
      case "number":
        input = this.inputForm.createChild("input", {type: "tel", name: "phone-number"});
        submit = this.inputForm.createChild("div", {content: "send"});
        break;
      case "code":
        input = this.inputForm.createChild("input", {type: "tel", name: "confirm-code"});
        submit = this.inputForm.createChild("div", {content: "confirm"});
        break;
    }

    return new Promise((resolve, reject) => {
      submit.onclick = () => {
        this.locked = true;
        resolve(input.value);
      }
    });
  }

  set locked(value){
    this.toggleAttribute("locked", value)
  }
  set user(value) {
    this.toggleAttribute("user", value);
    this._user = value;
  }
  get user() {
    return this._user;
  }
}
