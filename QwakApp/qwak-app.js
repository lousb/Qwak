import {SvgPlus} from "../SvgPlus/4.js"
import {QwakLogin} from "./qwak-login.js"

export class QwakApp extends SvgPlus {
  onconnect(){
    this.innerHTML = "";
    this.qlogin = this.createChild(QwakLogin);
  }
}

SvgPlus.defineHTMLElement(QwakApp);
