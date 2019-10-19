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

  public id: string; // Get ID to query
  project: IProject; // Project to show
  showSpinner: boolean = true; // loading screen validation
  heigth: number; // Header height

  createOn: boolean = true; // Validate if the mode to create is on
  editOn: boolean; // Validate if the mode edit is on
  viewOn: boolean; // Validate if the mode view is on

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
            console.log("yes");
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
}
