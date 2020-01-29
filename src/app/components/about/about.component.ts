import { Component, OnInit, HostListener, AfterContentInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { IData } from 'src/app/core/models/IData';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

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
        ];
        // Once everything loads stop loading animation
        this.showSpinner = false;
      });
    });
  }

  // Function to go back to the top
  goUp() {
    window.scrollTo(0, document.getElementsByClassName('banner').item(0).clientHeight);
  }

}
