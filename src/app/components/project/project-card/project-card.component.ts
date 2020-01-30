import { Component, OnInit, Input } from '@angular/core';
import { IProject } from 'src/app/core/models/IProject';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: IProject; // Project from the parent component

  // Constructor
  constructor() { }

  ngOnInit() {
  }

}
