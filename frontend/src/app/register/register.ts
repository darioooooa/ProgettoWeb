import { Component} from '@angular/core';
import { Router} from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, UtenteDTO } from '../auth/auth.service';
@Component({
  selector: 'app-register',
  standalone:true,
  imports: [RouterModule,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  dati={
    nome:'',
    cognome:'',
    email:'',
    password:'',
    confermaPassword:''
  }
  messaggioErrore: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}


  onSubmit(){
    this.messaggioErrore = ''; //resetto l'errore ogni volta che provo ad inviare
    if (!this.dati.nome || !this.dati.cognome || !this.dati.email || !this.dati.password) {
      this.messaggioErrore = 'Attenzione: compila tutti i campi obbligatori.';
      return; // Blocca tutto, non andare avanti
    }
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    //controlliamo se la pw rispetta la regex
    if (!passwordPattern.test(this.dati.password)) {
      this.messaggioErrore = 'La password deve essere di almeno 8 caratteri e contenere una lettera e un numero!.';
      return;
    }

    //controlliamo se la password corrisponde con quella in conferma password
    if (this.dati.password !== this.dati.confermaPassword) {
      this.messaggioErrore = 'Le due password non coincidono.';
      return;
    }
    //CHIAMATA AL BACKEND
    this.isLoading = true;
    const nuovoUtente: UtenteDTO = {  //Fondamentale per mandare al back-end un file JSON pulito
      nome: this.dati.nome,
      cognome: this.dati.cognome,
      email: this.dati.email,
      password: this.dati.password
    };
    //chiamo il metodo register del service
    this.authService.register(nuovoUtente).subscribe({
      next: (response) => {
        console.log('Registrazione avvenuta con successo:', response);
        // Se va tutto bene, mando l'utente al login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Errore backend:', err);
        this.isLoading = false; // Riabilito il bottone
        // Gestione errori specifici (es. Email già usata)
        if (err.status === 409 || err.status === 500) {
          this.messaggioErrore = "Impossibile registrarsi. L'email potrebbe essere già in uso.";
        } else {
          this.messaggioErrore = "Errore di connessione al server. Riprova più tardi.";
        }
      }
    });
  }
}
