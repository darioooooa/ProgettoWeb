package com.example.progettowebapplication.controller;

import com.example.progettowebapplication.dao.LegaDaoJDBC;
import com.example.progettowebapplication.model.LegaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@RestController
@RequestMapping("/lega")
@CrossOrigin(origins = "http://localhost:4200") // Per Angular
public class LegaController {

    // Spring inietta automaticamente il DataSource (configurato in application.properties)
    @Autowired
    private DataSource dataSource;

    @PostMapping("/crea")
    public ResponseEntity<?> createLega(@RequestBody LegaDTO legaInput) {
        // Ottengo una connessione dal pool di Spring
        try (Connection connection = dataSource.getConnection()) {

            // Passo la connessione al tuo DAO
            LegaDaoJDBC legaDao = new LegaDaoJDBC(connection);

            // Eseguo il salvataggio
            LegaDTO legaSalvata = legaDao.createLega(legaInput);

            // Ritorno l'oggetto salvato (con l'ID nuovo) e status 201 (Created)
            return new ResponseEntity<>(legaSalvata, HttpStatus.CREATED);

        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Errore nel database: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>("Errore generico: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}