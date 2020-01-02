import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { IUser } from "../models/IUser";
import { email } from 'src/environments/key';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: boolean = false; // Check if the right user is logged
  public userData: Observable<IUser>; // Save logged in user data

  constructor(private afAuth: AngularFireAuth) {    
    // Get the user from the SignIn
    this.userData = this.afAuth.authState;

    this.userData.subscribe(user => {
      // Check is logged
      if (user != null) {
        // If there's one check if it have access or not
        if (user.email === email) { this.isLogged = true; }
      }
    });

  }

  // Sign in with Google
  SignIn() { return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()); }

  // Sign out 
  SignOut() { this.afAuth.auth.signOut(); this.isLogged = false; }
  
}
