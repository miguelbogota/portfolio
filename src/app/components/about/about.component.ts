import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  initAnimation: boolean = false; // Property to know if the skill bar animation has to start

  // Skills in the skill bar
  skills = [
    { name: 'HTML/CSS', percentage: '95%' },
    { name: 'JavaScript', percentage: '85%' },
    { name: 'Java', percentage: '90%' },
    { name: 'Angular 8', percentage: '90%' }
  ];

  constructor() { }

  ngOnInit() {
  }

  // Check when to start animation for fill the skills bars
  @HostListener('window:scroll', ['$event'])
  checkScroll() {

    // Get information of how far is the top from the skill div
    const componentPosition = document.getElementsByClassName('skill-list').item(0).getBoundingClientRect().top;
    const scrollPosition = window.pageYOffset * .7;

    // Validation to start animation if is already in the div
    if (scrollPosition >= componentPosition) { this.initAnimation = true; }

  }

  // Function to go back to the top
	goUp() {
		window.scrollTo(0, document.getElementsByClassName('banner').item(0).clientHeight);
	}

}
