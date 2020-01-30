import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { IMessage } from 'src/app/core/models/IMessage';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: IMessage; // Data informacion to contact

  // Constructor
  constructor(private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.contact = this.messageService.getEmptyMessage();
  }

  // Send information to the database
  submit() {
    this.messageService.push(this.contact); // Upload information
    // Confirmation input - This will be change in the future to look better
    alert('Tu informacion fue enviada, en los siguientes dias te contactare a el correo que me enviaste :)');
    this.contact = this.messageService.getEmptyMessage(); // Clear contact information
    this.router.navigate(['//']); // Send user back to the main page
  }

}
