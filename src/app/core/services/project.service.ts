import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { map, publishReplay, refCount, finalize } from 'rxjs/operators';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs';
import { IProject } from '../models/IProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private colletionName = 'projects'; // Collection name where the projects will be store
  private storageLocation = 'images/projects'; // Store location for the images in the database

  public uploadPercent: Observable<number>; // Upload percentage when uploading a project

  private projects: Observable<IProject[]>; // Observable with all the projects
  private projectCollection: AngularFirestoreCollection<IProject>; // Project collection in the database
  private projectDoc: AngularFirestoreDocument<IProject>; // Document of the project

  // Constructor
  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    // Get the collection
    this.projectCollection = this.db.collection<IProject>(this.colletionName);
    // Get values from the database
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

  // Generates a 8 digit number as ID and return it as a string
  generateID(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  }

  // Returns an empty project to work on
  getEmptyProject(): IProject {
    return {
      id: this.generateID(),
      title: '',
      subtitle: '',
      dateStart: firestore.Timestamp.fromDate(new Date()),
      dateEnd: firestore.Timestamp.fromDate(new Date()),
      imgUrl: '',
      link: 'https://',
      desc: ''
    };
  }

  // Returns all the projects in the database
  getAll(): Observable<IProject[]> {
    return this.projects;
  }

  // Returns a custom project with only the ID
  get(id: string): AngularFirestoreDocument<IProject> {
    this.projectDoc = this.db.doc(`${this.colletionName}/${id}`);
    return this.projectDoc;
  }

  // Adds or updates a message to the database
  push(project: IProject): void {
    const id = project.id; // Save ID
    delete project.id; // Delete id since I rather not to save it
    this.projectCollection.doc(id).set(project);
  }

  // Adds a new project with the photo to the database
  pushProject(project: IProject, img: File): void {
    // Path to upload photo and upload task
    const fileRef = this.storage.ref(`${this.storageLocation}/${project.id}`);
    const uploadImgTask: AngularFireUploadTask = this.uploadImg(img, project.id);
    // Get URL of the uploaded file
    uploadImgTask.snapshotChanges().pipe(
      // As soons as it finalize add project link
      finalize(() => {
        // Save URL for the photo and add project
        fileRef.getDownloadURL().subscribe((url: string) => {
          project.imgUrl = url; // Store URL in the project
          this.push(project); // Ad project to db
        });
      })
    ).subscribe();
  }

  // Uploads pictures to the firebase storage service
  uploadImg(img: File, id: string): AngularFireUploadTask {
    // Path to upload the picture with the id of the project
    const filePath = `${this.storageLocation}/${id}`;
    // Upload picture
    const task: AngularFireUploadTask = this.storage.upload(filePath, img);
    // Get the upload percentage as Observable
    this.uploadPercent = task.percentageChanges();
    // Return the task
    return task;
  }

  // Deletes a project from the database
  delete(id: string): void {
    this.get(id);
    this.projectDoc.delete();
  }

}
