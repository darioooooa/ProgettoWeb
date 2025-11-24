package com.example.progettowebapplication.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity // 1. Dice a Spring: "Questa classe è una tabella del DB"
@Table(name = "utenti")
public class Utente {
    @Id // Chiave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Corrisponde a SERIAL (autoincrement) di Postgres
    private Long id;

    @Column(nullable = false) // Non può essere vuoto
    private String nome;

    @Column(nullable = false)
    private String cognome;

    @Column(nullable = false, unique = true) // L'email deve essere unica nel sistema
    private String email;

    @Column(nullable = false)
    private String password;

    public Utente() {
    }

    // --- 2. COSTRUTTORE UTILE (Per creare nuovi utenti facilmente) ---
    public Utente(String nome, String cognome, String email, String password) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.password = password;
    }

    // --- 3. GETTER E SETTER (Fondamentali!) ---
    // Senza questi, Spring non riesce a leggere o scrivere i dati.

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCognome() { return cognome; }
    public void setCognome(String cognome) { this.cognome = cognome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
