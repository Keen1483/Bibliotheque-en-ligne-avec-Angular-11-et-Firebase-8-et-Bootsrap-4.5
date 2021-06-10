import { Component } from '@angular/core';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'library';

    constructor() {

        var firebaseConfig = {
            apiKey: "AIzaSyAus8g7U9BTYEuTLUlGgu4N8UEol6Dp7Bo",
            authDomain: "books-6f699.firebaseapp.com",
            projectId: "books-6f699",
            storageBucket: "books-6f699.appspot.com",
            messagingSenderId: "263790963032",
            appId: "1:263790963032:web:4cbabeca611c732c3b9d2d",
            measurementId: "G-06ZPL90CNL"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
          firebase.analytics();

    }
}
