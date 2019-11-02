import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { IMessage } from '../models/IMessage';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private colletionName: string = 'messages';

  private messages: Observable<IMessage[]>;
  private messageCollection: AngularFirestoreCollection<IMessage>;
  private messageDoc: AngularFirestoreDocument<IMessage>;

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
    )
  }

  // To generate a great ID for each project
  generateID(): string {
    return Math.floor(Math.random() * 100000000).toString();
  }

  // Function to get all the projects
  getAll(): Observable<IMessage[]> {
    return this.messages;
  }

  // Funtion to get a project with the ID
  get(id: string) {
    this.messageDoc = this.db.doc(`${this.colletionName}/${id}`);
    return this.messageDoc;
  }

  // Funtion to add a new project
  add(project: IMessage) {
    this.messageCollection.doc(project.id).set(project);
  }

  // Funtion to update the data in a document
  update() {

  }

  // Funtion to delete a document
  delete(id: string) {
    this.get(id);
    this.messageDoc.delete();
  }
}