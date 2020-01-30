import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IData } from '../models/IData';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private colletionName: string = 'data';

  private data: Observable<IData[]>;
  private dataCollection: AngularFirestoreCollection<IData>;
  private dataDoc: AngularFirestoreDocument<IData>;

  constructor(private db: AngularFirestore) {
    // Get the collection
    this.dataCollection = this.db.collection<IData>(this.colletionName);
    // Get values
    this.data = this.dataCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IData;
        data.id = a.payload.doc.id;
        return data;
      })),
      publishReplay(1),
      refCount()
    );
  }

  // To generate a great ID for each data
  generateID(name: string): string {
    return name;
  }

  // Function to get all the data
  getAll(): Observable<IData[]> {
    return this.data;
  }

  // Funtion to get a data with the ID
  get(id: string) {
    this.dataDoc = this.db.doc(`${this.colletionName}/${id}`);
    return this.dataDoc;
  }

  // Funtion to add a new message
  add(data: IData) {
    let id = data.id; // Save ID
    delete data.id; // Delete id since I rather not to save it
    this.dataCollection.doc(id).set(data);
  }

  // Funtion to update the data in a document
  update() {

  }

  // Funtion to delete a document
  delete(id: string) {
    this.get(id);
    this.dataDoc.delete();
  }
}
