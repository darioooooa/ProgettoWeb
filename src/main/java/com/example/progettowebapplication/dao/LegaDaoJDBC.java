package com.example.progettowebapplication.dao;

import com.example.progettowebapplication.model.LegaDTO;

import java.sql.*;

public class LegaDaoJDBC implements ILegaDAO{
    private Connection connection;
    public LegaDaoJDBC(Connection connection) {
        this.connection = connection;
    }
    @Override
    public LegaDTO createLega(LegaDTO lega) {
        String query = "INSERT INTO Lega (id_lega, nome_lega, codice_invito, numero_squadre, budget_iniziale) VALUES (?, ?, ?, ?,?)";

        // Uso RETURN_GENERATED_KEYS per chiedere al DB l'ID appena creato
        try (PreparedStatement ps = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {

            // Imposto i parametri prendendoli dall'oggetto lega passato in input
            ps.setInt(1, lega.getId_lega());
            ps.setString(2, lega.getNome_lega());
            ps.setString(3, lega.getCodice_invito());
            ps.setInt(4, lega.getNumero_squadre());
            ps.setInt(5, lega.getBudget_iniziale());


            // Eseguo l'inserimento
            ps.executeUpdate();

            // Recupero l'ID generato
            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) {
                    // Assegno l'ID generato all'oggetto lega
                    lega.setId_lega(rs.getInt(1));
                }
            }

            return lega; // Ritorno l'oggetto aggiornato con il nuovo ID

        } catch (SQLException e) {
            throw new RuntimeException("Errore durante la creazione della lega", e);
        }
    }

}
