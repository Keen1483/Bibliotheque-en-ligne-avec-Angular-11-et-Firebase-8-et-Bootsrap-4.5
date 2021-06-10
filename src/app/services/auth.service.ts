import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor() { }

    createNewUser(email: string, password: string) {
        return new Promise<void>(
            (resolve, reject) => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(
                        () => {
                            resolve();
                        },
                        (error) => {
                            reject(error);
                        }
                    );
            }
        );
    }

    signInUser(email: string, password: string) {
        return new Promise<void>(
            (resolve, reject) => {
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(
                        () => {
                            resolve();
                        },
                        (error) => {
                            reject(error);
                        }
                    );
            }
        );
    }

    signInWithGoogle() {
        return new Promise<void>(
            (resolve, reject) => {
                var provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('profile');
                provider.addScope('email');
                firebase.auth().signInWithPopup(provider)
                    .then(
                        () => {
                            resolve();
                        },
                        (error) => {
                            reject(error);
                        }
                    );
            }
        );
    }

    signInWithFacebook() {
        return new Promise<void>(
            (resolve, reject) => {
                var provider = new firebase.auth.FacebookAuthProvider();
                firebase.auth().signInWithPopup(provider)
                    .then(
                        () => {
                            resolve();
                        },
                        (error) => {
                            reject(error);
                        }
                    );
            }
        );
    }

    signOutUser() {
        firebase.auth().signOut();
    }
}
