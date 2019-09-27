import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  skills = [
    { name: 'HTML/CSS', percentage: '95%' },
    { name: 'JavaScript', percentage: '85%' },
    { name: 'Java', percentage: '90%' },
    { name: 'Angular 8', percentage: '90%' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
