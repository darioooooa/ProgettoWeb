package com.example.progettowebapplication.dao;

import com.example.progettowebapplication.model.UtenteDTO;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UtenteDaoJDBC implements IUtenteDAO {

    private Connection connection;

    public UtenteDaoJDBC(Connection connection) {
        this.connection = connection;
    }

    @Override
    public UtenteDTO insertUtente(UtenteDTO utente) {
        String query = "INSERT INTO utenti (nome, cognome, email, password) VALUES (?, ?, ?, ?)";

        try (PreparedStatement ps = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, utente.getNome());
            ps.setString(2, utente.getCognome());
            ps.setString(3, utente.getEmail());
            ps.setString(4, utente.getPassword());

            ps.executeUpdate();

            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) {
                    utente.setId(rs.getLong(1));
                }
            }
            return utente;
        } catch (SQLException e) {
            throw new RuntimeException("Errore inserimento utente", e);
        }
    }

    @Override
    public List<UtenteDTO> getAllUtenti() {
        List<UtenteDTO> utenti = new ArrayList<>();
        String query = "SELECT * FROM utenti";

        try (Statement st = connection.createStatement();
             ResultSet rs = st.executeQuery(query)) {

            while (rs.next()) {
                UtenteDTO u = new UtenteDTO();
                u.setId(rs.getLong("id"));
                u.setNome(rs.getString("nome"));
                u.setCognome(rs.getString("cognome"));
                u.setEmail(rs.getString("email"));
                u.setPassword(rs.getString("password"));

                utenti.add(u);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Errore lettura utenti", e);
        }
        return utenti;
    }

    @Override
    public UtenteDTO getUtenteById(Long id) {
        String query = "SELECT * FROM utenti WHERE id = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    // Costruzione manuale del DTO o tramite costruttore
                    return new UtenteDTO(
                            rs.getLong("id"),
                            rs.getString("nome"),
                            rs.getString("cognome"),
                            rs.getString("email"),
                            rs.getString("password")
                    );
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Errore ricerca utente per id", e);
        }
        return null;
    }

    @Override
    public UtenteDTO getUtenteByEmail(String email) {
        String query = "SELECT * FROM utenti WHERE email = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, email);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new UtenteDTO(
                            rs.getLong("id"),
                            rs.getString("nome"),
                            rs.getString("cognome"),
                            rs.getString("email"),
                            rs.getString("password")
                    );
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Errore ricerca utente per email", e);
        }
        return null;
    }

    @Override
    public void updateUtente(UtenteDTO utente) {
        String query = "UPDATE utenti SET nome=?, cognome=?, email=?, password=? WHERE id=?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, utente.getNome());
            ps.setString(2, utente.getCognome());
            ps.setString(3, utente.getEmail());
            ps.setString(4, utente.getPassword());
            ps.setLong(5, utente.getId());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Errore aggiornamento utente", e);
        }
    }

    @Override
    public void deleteUtente(Long id) {
        String query = "DELETE FROM utenti WHERE id=?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setLong(1, id);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Errore eliminazione utente", e);
        }
    }
}