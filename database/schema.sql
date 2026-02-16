CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    position VARCHAR(10) NOT NULL,
    date_of_birth DATE,
    place_of_birth VARCHAR(100),
    debut_date DATE,
    status VARCHAR(20) DEFAULT 'Active',
    CONSTRAINT unique_player_name UNIQUE (first_name, last_name)
);