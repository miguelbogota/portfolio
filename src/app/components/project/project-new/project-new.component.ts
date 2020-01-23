import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { IProject } from 'src/app/core/models/IProject';
import { firestore } from 'firebase/app';
import { CropperComponent } from '../../shared/cropper/cropper.component';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss']
})
export class ProjectNewComponent implements OnInit {

  @ViewChild('cropper', {static: false}) private croppper: CropperComponent;

  newID: string = this.projectService.generateID(); // New generated ID

  dateFrom = ''; // Data binding for From date
  dateTo = ''; // Data binding for To date

  project: IProject; // Project to upload
  imgSelected: File = null; // Images that will be loaded
  uploadPercentage: number; // Percentage for upload

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.uploadPercentage = -1;
    this.project = {
      id: this.newID,
      title: '',
      subtitle: '',
      dateStart: firestore.Timestamp.fromDate(new Date()),
      dateEnd: firestore.Timestamp.fromDate(new Date()),
      imgUrl: '',
      link: 'https://',
      desc: ''
    };
  }

  // Function to add project
  addProject(): void {
    // Scroll to the top
    window.scrollTo(0, document.getElementsByClassName('banner').item(0).clientHeight);
    // Convert date if it was choose
    if (this.dateFrom) { this.project.dateStart = firestore.Timestamp.fromDate(new Date(this.dateFrom + 'T00:00')); }
    if (this.dateTo) { this.project.dateEnd = firestore.Timestamp.fromDate(new Date(this.dateTo + 'T00:00')); }
    // Upload project with image
    this.projectService.pushProject(this.project, this.imgSelected);
    // Get upload percentage to show it in the screen
    this.projectService.uploadPercent.subscribe(
      // Get result
      (percentage: number) => { this.uploadPercentage = percentage; },
      // Get error
      (err: Error) => { console.log(err); },
      // Clear project once is finished
      () => {
        this.project = {
          id: this.projectService.generateID(),
          title: '',
          subtitle: '',
          dateStart: firestore.Timestamp.fromDate(new Date()),
          dateEnd: firestore.Timestamp.fromDate(new Date()),
          imgUrl: '',
          link: 'https://',
          desc: ''
        };
        this.dateFrom = '';
        this.dateTo = '';
        this.croppper.removeImage();
      }
    );
  }

  // Get image from the child
  getMedia($event: any): void { this.imgSelected = $event; }
}
