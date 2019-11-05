import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { IProject } from '../models/IProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private colletionName: string = 'projects';

  private projects: Observable<IProject[]>;
  private projectCollection: AngularFirestoreCollection<IProject>;
  private projectDoc: AngularFirestoreDocument<IProject>;

  constructor(private db: AngularFirestore) {
    // Get the collection
    this.projectCollection = this.db.collection<IProject>(this.colletionName);
    // Get values
    this.projects = this.projectCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IProject;
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
  getAll(): Observable<IProject[]> {
    return this.projects;
  }

  // Funtion to get a project with the ID
  get(id: string) {
    this.projectDoc = this.db.doc(`${this.colletionName}/${id}`);
    return this.projectDoc;
  }

  // Funtion to add a new project
  add(project: IProject) {
    let id = project.id; // Save ID
    delete project.id; // Delete id since I rather not to save it
    this.projectCollection.doc(id).set(project);
  }

  // Funtion to update the data in a document
  update() {

  }

  // Funtion to delete a document
  delete(id: string) {
    this.get(id);
    this.projectDoc.delete();
  }

}
