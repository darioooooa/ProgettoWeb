import { Component, OnInit } from '@angular/core'; // Aggiungi OnInit
import { RouterModule } from '@angular/router';
import { AuthService, UtenteDTO } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  // Variabile per salvare l'utente loggato (inizialmente null)
  currentUser: UtenteDTO | null = null;
  tabSelezionata: string = 'classifica';

  notizie = [
    { id: 1, titolo: "Infortunio Dybala", data: "22/11", descrizione: "Tegola...", category: "Infortunati" },
    { id: 2, titolo: "Consigli Giornata", data: "21/11", descrizione: "Chi schierare...", category: "Formazione" }
  ];

  classifica = [
    { pos: 1, squadra: 'Inter', pt: 34 },
    { pos: 2, squadra: 'Juventus', pt: 32 },
    { pos: 3, squadra: 'Milan', pt: 29 }
  ];

  marcatori = [
    { nome: 'Lautaro', squadra: 'INT', gol: 12 },
    { nome: 'Osimhen', squadra: 'NAP', gol: 10 }
  ];
  // INIEZIONE DEL SERVICE
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Chiediamo al backend: "Sono loggato?"
    this.authService.checkAuthStatus().subscribe(isLogged => {
      if (isLogged) {
        // Se sì, prendiamo i dati dell'utente (nome, cognome, ecc)
        this.currentUser = this.authService.getUserSnapshot();
      } else {
        this.currentUser = null;
      }
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.currentUser = null; // Pulisce la variabile, la navbar tornerà come prima
      // Opzionale: window.location.reload(); per pulire tutto
    });
  }

  setTab(tab: string) {
    this.tabSelezionata = tab;
  }
}
