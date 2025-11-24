import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Serve solo questo per i link

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule], // Niente CommonModule!
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  // ... tutto il resto del codice identico a prima ...

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

  setTab(tab: string) {
    this.tabSelezionata = tab;
  }
}
