-- CREAR BASE DE DATOS
drop database if exists obligatorio;
create database obligatorio;
use obligatorio;

-- CREAR TABLAS
-- Tabla logins
create table logins
(
    logId    varchar(50),
    password varchar(50),
    primary key (logId, password)
);

-- Tabla funcionarios
create table funcionarios
(
    ci             integer(7),
    nombre         varchar(50),
    apellido       varchar(50),
    fch_nacimiento date,
    direccion      varchar(50),
    telefono       integer,
    email          varchar(50),
    logId          varchar(50),
    primary key (ci),
    foreign key (logId) references logins (logId)
);

-- Tabla agenda
create table agenda
(
    nro        integer primary key AUTO_INCREMENT ,
    ci         integer(7),
    fch_agenda date
);

-- Tabla carnet salud
create table carnet_salud(
    ci integer primary key ,
    fch_emision date,
    fch_vencimiento date,
    comprobante blob
);

-- Tabla periodos_actualizacion
create table periodos_actualizacion(
    año year,
    semestre integer check(semestre in (1,2)),
    fch_inicio date,
    fch_fin date
);
-- Insertar datos en la tabla logins
INSERT INTO logins (logId, password) VALUES
('usuario1', 'contraseña1'),
('usuario2', 'contraseña2'),
('usuario3', 'contraseña3');

-- Insertar datos en la tabla funcionarios
INSERT INTO funcionarios (ci, nombre, apellido, fch_nacimiento, direccion, telefono, email, logId) VALUES
(1234567, 'Juan', 'Perez', '1990-01-15', 'Calle Principal 123', 123456789, 'juan.perez@email.com', 'usuario1'),
(2345678, 'María', 'Gómez', '1985-05-20', 'Avenida Secundaria 456', 987654321, 'maria.gomez@email.com', 'usuario2'),
(3456789, 'Carlos', 'López', '1988-11-10', 'Ruta 789', 555123456, 'carlos.lopez@email.com', 'usuario3');

-- Insertar datos en la tabla agenda
INSERT INTO agenda (ci, fch_agenda) VALUES
( 1234567, '2023-11-15'),
( 2345678, '2023-11-20'),
( 3456789, '2023-11-25');

-- Insertar datos en la tabla carnet_salud
INSERT INTO carnet_salud (ci, fch_emision, fch_vencimiento, comprobante) VALUES
(1234567, '2023-01-01', '2024-01-01', 'documento_binario_1'),
(2345678, '2023-02-01', '2024-02-01', 'documento_binario_2'),
(3456789, '2023-03-01', '2024-03-01', 'documento_binario_3');

-- Insertar datos en la tabla periodos_actualizacion
INSERT INTO periodos_actualizacion (año, semestre, fch_inicio, fch_fin) VALUES
(2023, 1, '2023-01-01', '2023-06-30'),
(2023, 2, '2023-07-01', '2023-12-31');

show tables;

select * from funcionarios;

select fch_agenda from agenda where ci = 1234567;

insert into agenda ()