-- Crear base de datos
CREATE DATABASE IF NOT EXISTS tucostattoo;

-- Usar la base de datos
USE tucostattoo;

-- Crear tabla tag
CREATE TABLE tag (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Crear tabla photo
CREATE TABLE photo (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL UNIQUE,
    original_filename VARCHAR(255) NOT NULL,
    description TEXT,
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- Crear tabla photo_tag
CREATE TABLE photo_tag (
    photo_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    PRIMARY KEY (photo_id, tag_id),
    FOREIGN KEY (photo_id) REFERENCES photo(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tag(id) ON DELETE CASCADE
);

-- Insertar datos de ejemplo
INSERT INTO tag (name) VALUES ('realismo'), ('minimalista'), ('color'), ('blanco-negro');

-- Nota: Las fotos se insertan via /admin
