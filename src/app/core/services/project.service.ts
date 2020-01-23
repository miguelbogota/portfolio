import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount, finalize } from 'rxjs/operators';
import { IProject } from '../models/IProject';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private colletionName: string = 'projects';
  private storageName: string = 'images/projects';

  public uploadPercent: Observable<number>;

  private projects: Observable<IProject[]>;
  private projectCollection: AngularFirestoreCollection<IProject>;
  private projectDoc: AngularFirestoreDocument<IProject>;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
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
    );
  }

  // To generate a great ID for each project
  generateID(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
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

  // Funtion to add project with photo
  pushProject(project: IProject, img: File): void {
    // Path to upload photo and upload task
    const fileRef = this.storage.ref(`${this.storageName}/${project.id}`);
    const uploadImgTask: AngularFireUploadTask = this.uploadImg(img, project.id);
    // Get URL of the uploaded file
    uploadImgTask.snapshotChanges().pipe(
      // As soons as it finalize add project link
      finalize(() => {
        // Save URL for the photo and add project
        fileRef.getDownloadURL().subscribe((url: string) => {
          project.imgUrl = url; // Store URL in the project
          this.add(project); // Ad project to db
        });
      })
    ).subscribe();
  }

  // Function to upload pictures to the firebase storage service
  uploadImg(img: File, id: string): AngularFireUploadTask {
    // Path to upload the picture with the id of the project
    const filePath: string = `${this.storageName}/${id}`;
    // Upload picture
    const task: AngularFireUploadTask = this.storage.upload(filePath, img);
    // Get the upload percentage as Observable
    this.uploadPercent = task.percentageChanges();
    // Return the task
    return task;
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
