import { Component, OnInit } from '@angular/core';
import { IProject } from 'src/app/models/IProject';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  id: string; // Get ID to query
  project: IProject; // Project to show
  showSpinner: boolean = true; // loading screen validation

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    // Get size of header and scroll to bottom of it
    window.scrollTo(0, document.getElementsByClassName('banner').item(0).clientHeight);

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

}
