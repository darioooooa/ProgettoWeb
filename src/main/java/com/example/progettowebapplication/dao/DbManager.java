package com.example.progettowebapplication.dao;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties; // Import fondamentale

public final class DbManager {

    private static DbManager instance = null;

    private DbManager() {}

    public static DbManager getInstance() {
        if (instance == null) {
            instance = new DbManager();
        }
        return instance;
    }

    private Connection con = null;
    private IUtenteDAO utenteDao = null;

    public Connection getConnection() {
        if (con == null) {
            try {
                // 1. Carica il file application.properties
                Properties prop = new Properties();
                try (InputStream input = getClass().getClassLoader().getResourceAsStream("application.properties")) {
                    if (input == null) {
                        throw new RuntimeException("Impossibile trovare application.properties");
                    }
                    prop.load(input);
                }

                String dbUrl = prop.getProperty("spring.datasource.url");
                String dbUser = prop.getProperty("spring.datasource.username");
                String dbPass = prop.getProperty("spring.datasource.password");

                con = DriverManager.getConnection(dbUrl, dbUser, dbPass);

            } catch (SQLException | IOException e) {
                throw new RuntimeException("Errore di connessione al DB", e);
            }
        }
        return con;
    }

    public IUtenteDAO getUtenteDao() {
        if (utenteDao == null) {
            utenteDao = new UtenteDaoJDBC(getConnection());
        }
        return utenteDao;
    }
}