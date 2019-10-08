import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  public projects = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    
    this.projectService.getAll().subscribe(project => {
      this.projects = project;
    });

    

  }
}
