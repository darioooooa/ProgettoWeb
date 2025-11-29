CREATE TABLE public.utenti (
        id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        nome varchar NOT NULL,
        cognome varchar NOT NULL,
        email varchar NOT NULL UNIQUE,
        password varchar NOT NULL
);
-- CREATE TABLE public.leghe (
--         id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--         nome varchar NOT NULL,
--         codice_invito varchar NULL
-- );