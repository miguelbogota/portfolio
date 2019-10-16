import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { email } from "../../../environments/key";
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  // Personal email to access the admin section
  email: string = email; // Secret key
  checkEmail: boolean = false; // Validate if the email is the same one
  showSpinner: boolean = true; // loading screen validation
  projects = []; // Array to store the projects

  constructor(private afAuth: AngularFireAuth, private projectService: ProjectService) { }

  ngOnInit() {

    // Check if there's any user and if email is the same
    this.afAuth.user.subscribe(user => {
      // Validate if there's any user logged
      if(user != null) {
        // If there's one check if it have access or not
        if (user.email === this.email) {
          this.checkEmail = true;
          this.projectService.getAll().subscribe(project => this.projects = project);
        }
        else this.checkEmail = false;
      }
      // Once everything loads stop loading animation
      this.showSpinner = false;
    });

  }

  // Login with pop-up
  login() { this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()); }

  // Funtion to logout
  logout() { this.afAuth.auth.signOut(); }

  // Funtion to delete the project
  deleteProject(projectID: string) {
    const responce = confirm('Do you want to delete this project?');
    if (responce) this.projectService.delete(projectID);
  }

}
