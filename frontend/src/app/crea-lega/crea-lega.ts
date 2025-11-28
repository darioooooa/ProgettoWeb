import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crea-lega', // Aggiornato per combaciare con il nome cartella
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './crea-lega.html', // Puntiamo al file rinominato
  styleUrl: './crea-lega.css'      // Puntiamo al file rinominato
})
export class CreaLega { // Aggiornato anche il nome della classe per ordine
  // Qui in futuro metteremo la logica per salvare i dati
}
