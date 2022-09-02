import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
import { firebaseConfig } from "./config.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

var updateHandler;
var userSignedIn;
export function onUserUpdate(callback){
  updateHandler = callback;
  UpdateUser(userSignedIn);
};
function UpdateUser(e){
  if(updateHandler instanceof Function){
    updateHandler(e);
  }
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

const auth = getAuth();

export function makeCapture(el){
  let captcha = new RecaptchaVerifier(el, {
    'size': 'normal',
  }, auth);
  window.recaptchaVerifier = captcha;
  return captcha;
}

export async function sendPhoneNumberCode(number, captcha) {
  return await signInWithPhoneNumber(auth, number, captcha);
}

export async function confirmPhoneNumberCode(code, confirmationResult) {
  window.confirmationResult = confirmationResult;
  let results = await confirmationResult.confirm(code);
  return results.user != null;
}

export function signout() {signOut(auth);}

onAuthStateChanged(auth, (u) => {
  let signedIn = u != null;
  console.log(u);
  userSignedIn = signedIn;
  UpdateUser(signedIn);
})
