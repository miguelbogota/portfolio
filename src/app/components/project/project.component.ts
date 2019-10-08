import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { IProject } from 'src/app/models/IProject';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public id: string;
  project: IProject;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
    

    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
    });

    
    
  }

  deletep(event) {
    this.projectService.delete(this.id);
  }

}
