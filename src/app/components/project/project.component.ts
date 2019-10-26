import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { IProject } from 'src/app/models/IProject';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  id: string; // Get ID to query
  project: IProject; // Project to show
  showSpinner: boolean = true; // loading screen validation
  heigth: number; // Header height

  createOn: boolean = true; // Validate if the mode to create is on
  editOn: boolean; // Validate if the mode edit is on
  viewOn: boolean; // Validate if the mode view is on

  imgSrc: string = 'http://arabimagefoundation.com/images/defaultImage.png'; // Default value to see the image preview
  selectedImg: string = null; // Image to upload

  dateFrom: boolean = false; // Show datepicker for date from
  dateTo: boolean = false; // Show datepicker for date to

  months = [
    { id: 1, name: "January" }, { id: 2, name: "February" }, { id: 3, name: "March" }, { id: 4, name: "April" }, { id: 5, name: "May" }, { id: 6, name: "June" }, { id: 7, name: "July" }, { id: 8, name: "August" }, { id: 9, name: "September" }, { id: 10, name: "October" }, { id: 11, name: "November" }, { id: 12, name: "December" }
  ]
  days = [
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }, { id: 26 }, { id: 27 }, { id: 28 }, { id: 29 }, { id: 30 }, { id: 31 }
  ]

  constructor(private projectService: ProjectService, private auth: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    // Get size of header and scroll to bottom of it
    this.heigth = document.getElementsByClassName('banner').item(0).clientHeight;
    window.scrollTo(0, this.heigth);

    // Get ID from the URL
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
    });

    // Validate if ID is in the DB
    this.projectService.get(this.id).snapshotChanges().subscribe(data => {
      // If it is in the DB load project to show
      if (data.payload.exists) {
        this.project = data.payload.data();
        this.project.id = data.payload.id;

        // Check mode
        this.auth.userData.subscribe(user => {
          // If logged with the right email load the projects
          if (this.auth.isLogged) {
            console.log("Logged right!")
          }
        });

      }
      // If is not send back to the portfolio
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

}
