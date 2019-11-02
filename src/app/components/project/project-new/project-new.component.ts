import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { IProject } from 'src/app/models/IProject';
import { firestore } from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss']
})
export class ProjectNewComponent implements OnInit {

  newID: string = this.projectService.generateID();; // New generated ID

  dateFromTime = { year: "", month: "1", day: "1" }; // Data binding for From date
  dateToTime = { year: "", month: "1", day: "1" }; // Data binding for To date
  dateFromStamp: Date; // Convert array above to a date for From
  dateToStamp: Date; // Convert array above to a date for To

  // Project to upload
  project: IProject = {
    id: this.newID,
    title: '',
    subtitle: '',
    dateStart: firestore.Timestamp.fromDate(new Date()),
    dateEnd: firestore.Timestamp.fromDate(new Date()),
    imgUrl: '',
    link: '',
    desc: ''
  };

  showSpinner: boolean = true; // loading screen validation

  imgSrc: string = 'http://arabimagefoundation.com/images/defaultImage.png'; // Default value to see the image preview
  selectedImg: string = null; // Image to upload

  dateFrom: boolean = false; // Show datepicker for date from
  dateTo: boolean = false; // Show datepicker for date to

  // Option with all of the months
  months = [
    { id: 1, name: "January" }, { id: 2, name: "February" }, { id: 3, name: "March" }, { id: 4, name: "April" }, { id: 5, name: "May" }, { id: 6, name: "June" }, { id: 7, name: "July" }, { id: 8, name: "August" }, { id: 9, name: "September" }, { id: 10, name: "October" }, { id: 11, name: "November" }, { id: 12, name: "December" }
  ]
  // Options with all of the days
  days = [
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }, { id: 26 }, { id: 27 }, { id: 28 }, { id: 29 }, { id: 30 }, { id: 31 }
  ]

  constructor(private projectService: ProjectService, private auth: AuthService, private storage: AngularFireStorage, private router: Router) { }

  ngOnInit() {
    
    // Get size of header and scroll to bottom of it
    window.scrollTo(0, document.getElementsByClassName('banner').item(0).clientHeight - 100);

    // Check access to the page
    this.auth.userData.subscribe(user => {
      // If logged with the right email load the projects
      if (this.auth.isLogged) {
        // Continue Here!!!
      }
      // If not return to the main page
      else {
        this.router.navigate(['/portfolio']);
      }
      // Once everything loads stop loading animation
      this.showSpinner = false;
    });

  }

  // Display preview image once is loaded.
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
    }
    else {
      this.imgSrc = 'http://arabimagefoundation.com/images/defaultImage.png';
      this.selectedImg = null;
    }
  }

  // Change the from and to dates input.
  toggleDate(id: string) {
    if (id == "from") {
      if (this.dateTo) { this.dateTo = false; }
      this.dateFrom = !this.dateFrom;
    }
    else if (id == "to") {
      if (this.dateFrom) { this.dateFrom = false; }
      this.dateTo = !this.dateTo;
    }
  }
  
  // Once the date has been entered.
  finishDate(id: string) {

    // Convert data binded to a date
    this.dateFromStamp = new Date(`${this.dateFromTime.year}-${this.dateFromTime.month}-${this.dateFromTime.day}`);
    this.dateToStamp = new Date(`${this.dateToTime.year}-${this.dateToTime.month}-${this.dateToTime.day}`);

    // Store it in project
    this.project.dateStart = firestore.Timestamp.fromDate(this.dateFromStamp);
    this.project.dateEnd = firestore.Timestamp.fromDate(this.dateToStamp);

    /* TODO: Make the validate below better */

    // Validate if is from "From" to send to "To"
    if (id == 'from') {
      if (this.dateTo) { this.dateTo = true; }
      this.dateFrom = !this.dateFrom;
    }
    // Close if is "To" Since is already finished
    else if (id == "to") {
      if (this.dateFrom) { this.dateFrom = false; }
      this.dateTo = false;
    }

  }

  // Submit to add new project
  OnSubmit() {

    // Get size of header and scroll to bottom of it
    window.scrollTo(0, document.getElementsByClassName('banner').item(0).clientHeight - 100);
    // Load spinner
    this.showSpinner = true;

    // Path to upload the picture
    let imgPath = `images/${this.newID}`;
    const imgRef = this.storage.ref(imgPath);
    this.storage.upload(imgPath, this.selectedImg).snapshotChanges().pipe(
      finalize(() => {
        imgRef.getDownloadURL().subscribe((url) => {
          this.project.imgUrl = url;
          this.projectService.add(this.project);
          this.router.navigate(['/portfolio']);
        });
      })
    ).subscribe();
  }

}
