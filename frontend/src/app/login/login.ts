import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule,RouterModule
    ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  dati={email:'', password:''};
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}
  onLogin() {
    this.authService.login(this.dati.email, this.dati.password)
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/']); //la pagina radice, la home
        } else {
          this.errorMsg = 'Credenziali errate';
        }
      });
  }

}
