import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/models/IUser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  user: IUser = null; // Logged user
  check: boolean = false; // Validate if the email is the same one
  showSpinnerUser: boolean = true; // loading screen validation
  showSpinnerProjects: boolean = true; // Loading screen for projects
  projects = []; // Array to store the projects

  constructor(private projectService: ProjectService, private auth: AuthService) { }

  ngOnInit() {

    this.auth.userData.subscribe(user => {
      // If logged with the right email load the projects
      if (this.auth.isLogged) {
        this.projectService.getAll().subscribe(project => {
          this.projects = project; // Store the projects
          this.showSpinnerProjects = false; // Stop loading screen for projects
        });
        this.user = user; // Store the user
        this.check = true; // Email is check and is the correct one
      }
      else { this.check = false /* Email is not the correc one */ }
      // Once everything loads stop loading animation
      this.showSpinnerUser = false;
    });

  }

  // Funtion to delete the project
  deleteProject(projectID: string) {
    const responce = confirm('Do you want to delete this project?');
    if (responce) this.projectService.delete(projectID);
  }

}
