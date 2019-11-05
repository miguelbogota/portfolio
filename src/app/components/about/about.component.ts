import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IData } from 'src/app/models/IData';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  initAnimation: boolean = false; // Property to know if the skill bar animation has to start
  showSpinner: boolean = true; // loading screen validation

  data: IData; // Storage about component data
  universal: IData; // Storage universal data

  // Skills in the skill bar
  skills = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dataService.get('universal').valueChanges().subscribe(universal => {
      this.universal = universal; // Save date
      // Get the data to show in about
      this.dataService.get('about').valueChanges().subscribe(data => {
        this.data = data; // Save date
        // Save skills
        this.skills = [
          { name: this.data.information3, percentage: this.data.information4 },
          { name: this.data.information5, percentage: this.data.information6 },
          { name: this.data.information7, percentage: this.data.information8 },
          { name: this.data.information9, percentage: this.data.information10 }
        ]
        // Once everything loads stop loading animation
        this.showSpinner = false;
      });
    });

  }

  // Check when to start animation for fill the skills bars
  @HostListener('window:scroll', ['$event'])
  checkScroll() {

    if (!this.showSpinner) {
      // Get information of how far is the top from the skill div
      const componentPosition = document.getElementsByClassName('skill-list').item(0).getBoundingClientRect().top;
      const scrollPosition = window.pageYOffset * .7;

      // Validation to start animation if is already in the div
      if (scrollPosition >= componentPosition) { this.initAnimation = true; }
      }
    }

  // Function to go back to the top
	goUp() {
		window.scrollTo(0, document.getElementsByClassName('banner').item(0).clientHeight);
	}

}
