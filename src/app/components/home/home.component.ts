import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { IProject } from 'src/app/models/IProject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lastThreeProjects = []; // Store the last 3 projects from the array
  allProjects = []; // Store all of the projects of the array
  showSpinner: boolean = true; // loading screen validation

  option: number = 0; // Option to show in the cards

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getAll().subscribe(project => {
      this.allProjects = project; // Save all project
      this.lastThreeProjects = this.allProjects.slice(this.allProjects.length - 3, this.allProjects.length); // Get only the last 3
      // Once everything loads stop loading animation
      this.showSpinner = false;
    });
  }

  // Funtion to change the order of the data
  changeCard(direction: string) {
    if (direction === "right") {
      if (this.option == 0) this.option = 1;
      else if (this.option == 1) this.option = 2;
      else if (this.option == 2) this.option = 0;
    }
    else if (direction === "left") {
      if (this.option == 0) this.option = 2;
      else if (this.option == 1) this.option = 0;
      else if (this.option == 2) this.option = 1;
    }
  }

  // Funtion to show the right data
  show(): IProject {
    return this.lastThreeProjects[this.option];
  }

}
