import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { IProject } from 'src/app/core/models/IProject';
import { DataService } from 'src/app/core/services/data.service';
import { IData } from 'src/app/core/models/IData';

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
  cardDireccion: string = ''; // Card to the left

  data: IData; // Storage about component data
  universal: IData; // Storage universal data

  constructor(private projectService: ProjectService, private dataService: DataService) { }

  ngOnInit() {

    this.dataService.get('universal').valueChanges().subscribe(universal => {
      this.universal = universal; // Save date
      // Get the data to show in about
      this.dataService.get('about').valueChanges().subscribe(data => {
        this.data = data; // Save date
        // Get the projects
        this.projectService.getAll().subscribe(project => {
          this.allProjects = project; // Save all project
          // Validate if array has more than 3 projetcs, and get the las 3
          if (this.allProjects.length > 3) { this.lastThreeProjects = this.allProjects.slice(-3); }
          else { this.lastThreeProjects = this.allProjects; }
          // Once everything loads stop loading animation
          this.showSpinner = false;
        });
      });
    });
  }

  // Funtion to change the order of the data
  changeCard(direction: string) {
    if (direction === "right") {
      if (this.option == 0) (this.lastThreeProjects.length > 1) ? this.option = 1 : this.option = 0;
      else if (this.option == 1) (this.lastThreeProjects.length > 2) ? this.option = 2 : this.option = 0;
      else if (this.option == 2) this.option = 0;
    }
    else if (direction === "left") {
      if (this.option == 0) (this.lastThreeProjects.length > 2) ? this.option = 2 : (this.lastThreeProjects.length > 1) ? this.option = 1 : this.option = 0;
      else if (this.option == 1) this.option = 0;
      else if (this.option == 2) this.option = 1;
    }
  }

  // Funtion to show the right data
  show(): IProject {
    return this.lastThreeProjects[this.option];
  }

  // Function to go back to the top
	goUp() {
		window.scrollTo(0, document.getElementsByClassName('banner').item(0).clientHeight);
  }

}
