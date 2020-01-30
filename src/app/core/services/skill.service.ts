import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ISkill } from '../models/ISkill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private colletionName = 'skills'; // Collection name to store the data
  private skills: Observable<ISkill[]>; // Observable for the messages
  private skillCollection: AngularFirestoreCollection<ISkill>; // Collection from the database
  private skillDoc: AngularFirestoreDocument<ISkill>; // Document ffrom the database

  // Constructor
  constructor(private db: AngularFirestore) {
    // Get the collection
    this.skillCollection = this.db.collection<ISkill>(this.colletionName);
    // Get values
    this.skills = this.skillCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ISkill;
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

  // Returns an empty skill to work on
  getEmptySkill(): ISkill {
    return { id: this.generateID(), name: '', percentage: '' };
  }

  // Returns all the skills in the database
  getAll(): Observable<ISkill[]> {
    return this.skills;
  }

  // Returns a custom skills with only the ID
  get(id: string): AngularFirestoreDocument<ISkill> {
    this.skillDoc = this.db.doc(`${this.colletionName}/${id}`);
    return this.skillDoc;
  }

  // Adds or updates a skill to the database
  push(skill: ISkill): void {
    const id = skill.id; // Save ID
    delete skill.id; // Delete id since I rather not to save it
    this.skillCollection.doc(id).set(skill);
  }

  // Deletes a skill from the database
  delete(id: string): void {
    this.get(id);
    this.skillDoc.delete();
  }
}
