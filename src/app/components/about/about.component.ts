import { Component, OnInit, HostListener, AfterContentInit } from '@angular/core';
import { SkillService } from 'src/app/core/services/skill.service';
import { ISkill } from 'src/app/core/models/ISkill';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  showSpinner = true; // Loading screen while loads information from the database
  skills: ISkill[] = []; // Skills for the skill bar

  // Constructor
  constructor(private skillService: SkillService) { }

  ngOnInit() {
    this.skillService.getAll().subscribe((skills: ISkill[]) => {
      this.skills = skills; // Save skills
      this.showSpinner = false; // Once everything loads stop loading animation
    });
  }

  // Function to go back to the top
  goUp() {
    window.scrollTo(0, document.getElementsByClassName('banner').item(0).clientHeight);
  }

}
