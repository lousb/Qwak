import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.9.3/database";
import { firebaseConfig } from "./config";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

var updateHandler;
var userSignedIn;

function onUpdate(callback){
  updateHandler = callback;
  Update(userSignedIn);
};

function Update(e){
  if(updateHandler instanceof Function){
    updateHandler(e);
  }
};



//storige connection
function configstorige(){

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);


    // Initialize Realtime Database and get a reference to the service
    const database = getDatabase(app);
}

export {configstorige};



//reCAPTCHA Authentication
import { getAuth } from "firebase/auth";

const auth = getAuth();
auth.languageCode = 'it';


//reCAPTCHA widget
const auth = getAuth();
window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  'size': 'normal',
  'callback': (response) => {
    
  },
  'expired-callback': () => {
    
  }
}, auth);

//text to phone
const phoneNumber = getPhoneNumberFromUserInput();
const appVerifier = window.recaptchaVerifier;

const auth = getAuth();
signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      const code = getCodeFromUserInput();
      confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        const user = result.user;
        userSignedIn = true;
        Update(true);
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error);
      });
    }).catch((error) => {
      grecaptcha.reset(window.recaptchaWidgetId);

      // Or, if you haven't stored the widget ID:
      window.recaptchaVerifier.render().then(function(widgetId) {
        grecaptcha.reset(widgetId);
      });
    });


