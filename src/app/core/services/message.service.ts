import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IMessage } from '../models/IMessage';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private colletionName = 'messages'; // Collection name to store the data
  private messages: Observable<IMessage[]>; // Observable for the messages
  private messageCollection: AngularFirestoreCollection<IMessage>; // Collection from the database
  private messageDoc: AngularFirestoreDocument<IMessage>; // Document ffrom the database

  // Constructor
  constructor(private db: AngularFirestore) {
    // Get the collection
    this.messageCollection = this.db.collection<IMessage>(this.colletionName);
    // Get values
    this.messages = this.messageCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IMessage;
        data.id = a.payload.doc.id;
        return data;
      })),
      publishReplay(1),
      refCount()
    );
  }

  // Generates a 8 digit number as ID and return it as a string
  generateID(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  }

  // Returns an empty message to work on
  getEmptyMessage(): IMessage {
    return { id: this.generateID(), name: '', email: '', message: '' };
  }

  // Returns all the messages in the database
  getAll(): Observable<IMessage[]> {
    return this.messages;
  }

  // Returns a custom messages with only the ID
  get(id: string): AngularFirestoreDocument<IMessage> {
    this.messageDoc = this.db.doc(`${this.colletionName}/${id}`);
    return this.messageDoc;
  }

  // Adds or updates a message to the database
  push(message: IMessage): void {
    const id = message.id; // Save ID
    delete message.id; // Delete id since I rather not to save it
    this.messageCollection.doc(id).set(message);
  }

  // Deletes a message from the database
  delete(id: string): void {
    this.get(id);
    this.messageDoc.delete();
  }
}
