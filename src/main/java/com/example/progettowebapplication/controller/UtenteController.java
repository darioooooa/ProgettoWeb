package com.example.progettowebapplication.controller;

import com.example.progettowebapplication.dao.DbManager;
import com.example.progettowebapplication.model.UtenteDTO;
import com.example.progettowebapplication.dao.IUtenteDAO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/utente") // URL base: http://localhost:8080/utente
@CrossOrigin(origins = "http://localhost:4200") // Permette ad Angular di chiamare questo backend
public class UtenteController {

    // GET ALL - Restituisce tutti gli utenti
    // Chiamata: GET http://localhost:8080/utente
    @GetMapping("")
    public List<UtenteDTO> getAllUtenti() {
        IUtenteDAO utenteDao = DbManager.getInstance().getUtenteDao();
        return utenteDao.getAllUtenti();
    }

    // CREATE - Aggiunge un nuovo utente (Registrazione)
    // Chiamata: POST http://localhost:8080/utente
    @PostMapping("")
    public UtenteDTO addUtente(@RequestBody UtenteDTO utente) {
        IUtenteDAO utenteDao = DbManager.getInstance().getUtenteDao();
        return utenteDao.insertUtente(utente);
    }

    // GET BY ID - Cerca un utente specifico
    // Chiamata: GET http://localhost:8080/utente/1
    @GetMapping("/{id}")
    public UtenteDTO getUtenteById(@PathVariable Long id) {
        IUtenteDAO utenteDao = DbManager.getInstance().getUtenteDao();
        return utenteDao.getUtenteById(id);
    }

    // DELETE - Elimina un utente
    // Chiamata: DELETE http://localhost:8080/utente/1
    @DeleteMapping("/{id}")
    public void deleteUtente(@PathVariable Long id) {
        IUtenteDAO utenteDao = DbManager.getInstance().getUtenteDao();
        utenteDao.deleteUtente(id);
    }

    // Login fittizio: cerca per email
    // Chiamata: POST http://localhost:8080/utente/login
    @PostMapping("/login")
    public UtenteDTO login(@RequestBody UtenteDTO credentials) {
        IUtenteDAO utenteDao = DbManager.getInstance().getUtenteDao();
        UtenteDTO user = utenteDao.getUtenteByEmail(credentials.getEmail());

        if (user != null && user.getPassword().equals(credentials.getPassword())) {
            return user; // Login ok
        }
        return null; // Credenziali errate
    }
}