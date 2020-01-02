import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  public projects = [];
  public idGenerated: string;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    
    this.projectService.getAll().subscribe(project => {
      this.projects = project;
    });

    /*
    this.idGenerated = Math.floor(Math.random() * 100000000).toString();
    this.projectService.add({
      id: this.idGenerated,
      title: "Page's name #" + this.idGenerated,
      subtitle: 'Short description generic #',
      dateStart: firestore.Timestamp.now(),
      dateEnd: firestore.Timestamp.now(),
      imgUrl: 'https://codropspz-tympanus.netdna-ssl.com/codrops/wp-content/uploads/2011/06/thumbss03.jpg',
      link: 'https://www.facebook.com/',
      desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima unde, consequuntur culpa eveniet perspiciatis sit dolores eos quo aliquid, harum ipsum illum. Aliquam quae dolore blanditiis debitis quas, rem in.'
    });*/

  }
}
