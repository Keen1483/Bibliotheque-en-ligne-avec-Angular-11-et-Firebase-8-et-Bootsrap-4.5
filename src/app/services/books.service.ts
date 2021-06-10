import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class BooksService {

    books: Book[] = [];
    booksSubject$ = new Subject<Book[]>();

    constructor() {
        this.getBooks();
    }

    emitBooks() {
        this.booksSubject$.next(this.books);
    }

    saveBooks() {
        firebase.database().ref('/books').set(this.books);
    }

    getBooks() {
        firebase.database().ref('/books')
            .on('value', (data: DataSnapshot) => {
                this.books = data.val() ? data.val() : [];
                this.emitBooks();
            });
    }

    getSingleBook(id: number) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/books/' + id).once('value')
                    .then(
                        (data: DataSnapshot) => {
                            resolve(data.val());
                        },
                        (error) => {
                            reject(error);
                        }
                    );
            }
        );
    }

    async createNewBook(newBook: Book) {
        this.books.push(newBook);
        await this.saveBooks();
        this.emitBooks();
    }

    async removeBook(book: Book) {
        if (book.photo) {
            const storageRef = await firebase.storage().refFromURL(book.photo);
            storageRef.delete().then(
                () => {
                    console.log('Photo removed');
                },
                (error) => {
                    console.log('Cloud not remove photo! : ' + error);
                }
            );
        }
        const bookIndexToRemove = this.books.findIndex(
            (bookEl) => {
                if (bookEl === book) {
                    return true;
                }
            }
        );
        this.books.splice(bookIndexToRemove, 1);
        await this.saveBooks()
        this.emitBooks();
    }

    uploadFile(file: File) {
        return new Promise(
            (resolve, reject) => {
                const almostUniqueFileName = Date.now().toString();
                const upload = firebase.storage().ref()
                    .child('images/' + almostUniqueFileName + file.name)
                    .put(file);
                upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    () => {
                        console.log('Chargement…');
                    },
                    (error) => {
                        console.log('Erreur de chargement ! : ' + error);
                        reject();
                    },
                    () => {
                        resolve(upload.snapshot.ref.getDownloadURL());
                    }
                );
            }
        );
    }
}
