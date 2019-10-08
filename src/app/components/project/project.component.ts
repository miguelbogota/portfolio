import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { IProject } from 'src/app/models/IProject';

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

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) { }

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
      }
      // If is not send back to the portfolio
      else {
        this.router.navigate(['/portfolio']);
      }
      // Once everything loads stop loading animation
      this.showSpinner = false;
    });
    
  }

  // Funtion to delete the project | Just for testing
  deletep(event) {
    this.projectService.delete(this.id);
  }

}
