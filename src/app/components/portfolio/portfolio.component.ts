import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { IProject } from 'src/app/core/models/IProject';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  public projects: IProject[] = [];

  // Constructor
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    // Get all the projects to show them
    this.projectService.getAll().subscribe(project => {
      this.projects = project;
    });
  }

}
