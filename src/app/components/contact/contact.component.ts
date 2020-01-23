import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/core/services/messages.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // Data informacion to contact
  contact = {
    id: '',
    name: '',
    email: '',
    message: ''
  };

  constructor(private messageService: MessagesService, private router: Router) { }

  ngOnInit() {
    this.contact.id = this.messageService.generateID();
  }

  // Upload data information to firebase
  submit() {
    this.messageService.add(this.contact); // Upload information
    // Confirmation input - This will be change in the future to look better
    alert('Tu informacion fue enviada, en los siguientes dias te contactare a el correo que me enviaste :)');
    this.contact = {id: this.messageService.generateID(), name: '', email: '', message: ''} // Clear contact information
    this.router.navigate(['//']); // Send user back to the main page
  }

}
