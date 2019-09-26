import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slide } from './animations/slide';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
	animations: [
		slide
	]
})
export class AppComponent {
	
	// Function to get the state of the animation
	getState(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['side'];
	}

}