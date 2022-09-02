import {SvgPlus} from "../SvgPlus/4.js"
import {onUserUpdate, signout, sendPhoneNumberCode, confirmPhoneNumberCode, makeCapture} from "../config/firebaseStorigeConfig.js";

export class QwakLogin extends SvgPlus{
  constructor(){
    super("qwak-login");
    this.icon = this.createChild("div", {class: "icon"});
    this.inputForm = this.createChild("div", {class: "input-form"});
    this.captchaBox = this.createChild("div");
    this.signing = true;
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
    this.signing = true;
    let number = await this.getValue("number");
    this.clearInput();

    let captchaEl = this.createChild("div");
    let captcha = makeCapture(captchaEl);
    let confirmationResult = await sendPhoneNumberCode(number, captcha);
    captchaEl.remove();

    let code = await this.getValue("code");
    this.clearInput();
    let user = await confirmPhoneNumberCode(code, confirmationResult);
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
  set signing(value){
    this.toggleAttribute("signing", value)
  }
  set user(value) {
    this.toggleAttribute("user", value);
    this._user = value;
    this.signing = false;
  }
  get user() {
    return this._user;
  }
}
