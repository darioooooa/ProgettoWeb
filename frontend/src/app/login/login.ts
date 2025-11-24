import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-login',
    imports: [
        RouterLink,FormsModule,RouterModule
    ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  dati={
    email:'',
    password:''

  }

}
