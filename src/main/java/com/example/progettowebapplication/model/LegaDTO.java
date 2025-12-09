package com.example.progettowebapplication.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LegaDTO {
    private int id_lega;
    private String nome_lega;
    private String codice_invito;
    private int numero_squadre;
    private int budget_iniziale;
}
