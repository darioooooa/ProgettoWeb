import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface UtenteDTO {  //fondamentale pe ricordare i dati dell'utente quando è nella sessione
  id?: number;
  nome: string;
  cognome: string;
  email: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/utente';

  private isLoggedIn: boolean = false;
  private currentUser: UtenteDTO | null = null;
  constructor(private http: HttpClient) {}

  // Getter semplice per lo stato attuale
  isLoggedInSnapshot(): boolean {
    return this.isLoggedIn;
  }

  getUserSnapshot(): UtenteDTO | null {
    return this.currentUser;
  }

  login(email: string, pass: string): Observable<boolean> {
    const headers = new HttpHeaders({
      // Creiamo la stringa "Basic base64(email:password)"
      // btoa() è una funzione standard che converte stringhe in Base64
      authorization: 'Basic ' + btoa(email + ':' + pass)
    });
    // Chiamiamo la GET /utente/login definita nel controller del backend
    return this.http.get<UtenteDTO>(`${this.baseUrl}/login`, {
      headers: headers,
      withCredentials: true // FONDAMENTALE: Dice al browser di salvare il cookie JSESSIONID
    }).pipe(
      tap(user => {
        this.isLoggedIn = true;
        this.currentUser = user;
        console.log('Login effettuato:', user);
      }),
      map(() => true), // Restituisco true se tutto ok
      catchError(err => {
        console.error('Login fallito', err);
        this.isLoggedIn = false;
        return of(false);
      })
    );
  }

  // Se /profile risponde 200, sei loggato. Se risponde 403, non lo sei.
  checkAuthStatus(): Observable<boolean> {
    return this.http.get<UtenteDTO>(`${this.baseUrl}/profile`, {
      withCredentials: true // Manda il cookie JSESSIONID salvato prima
    }).pipe(
      map(user => {
        if (user) {
          this.isLoggedIn = true;
          this.currentUser = user;
          return true;
        }
        return false;
      }),
      catchError(() => {
        this.isLoggedIn = false;
        this.currentUser = null;
        return of(false);
      })
    );
  }

  register(utente: UtenteDTO): Observable<UtenteDTO> {
    return this.http.post<UtenteDTO>(`${this.baseUrl}/register`, utente);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.isLoggedIn = false;
        this.currentUser = null;
      })
    );
  }
}
