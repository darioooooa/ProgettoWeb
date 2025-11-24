import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  }
}
