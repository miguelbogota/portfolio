import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { MessageService } from 'src/app/core/services/message.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/core/models/IUser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  user: IUser = null; // Logged user
  projects = []; // Array to store the projects
  messages = []; // Array to store the messages

  // Constructor
  constructor(private projectService: ProjectService, private messageService: MessageService, public auth: AuthService) { }

  ngOnInit() {
    // Get size of header and scroll to bottom of it
    window.scrollTo(0, document.getElementsByClassName('banner').item(0).clientHeight);
    // Get data from the database
    this.projectService.getAll().subscribe(project => {
      this.projects = project; // Store the projects
    });
    this.messageService.getAll().subscribe(message => {
      this.messages = message; // Store all of the messages
    });
  }

  // Funtion to delete the project
  deleteProject(projectID: string) {
    const responce = confirm('Do you want to delete this project?');
    if (responce) { this.projectService.delete(projectID); }
  }

  // Funtion to delete the message
  deleteMessage(messageID: string) {
    const responce = confirm('Do you want to delete this message?');
    if (responce) { this.messageService.delete(messageID); }
  }

}
