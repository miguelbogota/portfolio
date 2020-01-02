import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	// Function to go back to the top
	goUp() {
		window.scrollTo(0, document.getElementsByClassName('banner').item(0).clientHeight);
	}

}
