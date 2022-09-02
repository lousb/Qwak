import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
import { firebaseConfig } from "./config.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

var updateHandler;
var userSignedIn;

export function onUpdate(callback){
  updateHandler = callback;
  Update(userSignedIn);
};

function Update(e){
  if(updateHandler instanceof Function){
    updateHandler(e);
  }
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

//reCAPTCHA widget
const auth = getAuth();
const recap = document.querySelector("#recap");
const appVerifier = new RecaptchaVerifier(recap, {
  'size': 'normal',
}, auth);

export async function signin() {
  try {

    //text to phone
    const phoneNumber = "+61492840426"; //getPhoneNumberFromUserInput();


    let confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    window.confirmationResult = confirmationResult;
    const code = getCodeFromUserInput();
    let results = await confirmationResult.confirm(code)
    // User signed in successfully.
    const user = result.user;
    userSignedIn = true;
    Update(true);
  } catch(e) {
    console.log(e);
    // recaptcha.reset(window.recaptchaWidgetId);
    // // Or, if you haven't stored the widget ID:
    // let widgetId = await window.recaptchaVerifier.render()
    // grecaptcha.reset(widgetId);
  }
}
