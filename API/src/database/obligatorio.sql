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

-- Tabla funcionarios de la institución  los cuales ya se encuentran registrados en el sistema.
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

-- Tabla funcionarios de la institución incluyendo a aquellos que aun no están registrados en el sistema.
create table funcionariosUcu
(
    ci             integer(7),
    nombre         varchar(50),
    apellido       varchar(50),
    fch_nacimiento date,
    direccion      varchar(50),
    telefono       integer,
    email          varchar(50),
    primary key (ci)
);

-- Tabla agenda
create table agenda
(
    nro        integer primary key AUTO_INCREMENT default (1),
    ci         integer(7),
    fch_agenda date
);

-- Tabla carnet salud
create table carnet_salud(
    ci integer primary key ,
    fch_emision date,
    fch_vencimiento date,
    comprobante varchar(500)
);

-- Tabla periodos_actualizacion
create table periodos_actualizacion(
    año year,
    semestre integer check(semestre in (1,2)),
    fch_inicio date,
    fch_fin date
);
drop table periodos_actualizacion;

-- Tabla rol
create table rol
(
    logId varchar(50),
    rol   varchar(50) check (rol in ('admin', 'funcionario')),
    primary key (logId),
    foreign key (logId) references logins(logId)
);

-- Insertar datos en la tabla logins
INSERT INTO logins (logId, password) VALUES
('usuario1', 'contraseña1'),
('usuario2', 'contraseña2'),
('usuario3', 'contraseña3');

-- Insertar datos en la tabla funcionarios
INSERT INTO funcionarios (ci, nombre, apellido, fch_nacimiento, direccion, telefono, email, logId) VALUES
(1234567, 'Juan', 'Perez', '1990-01-15', 'Calle Principal 123', 123456789, 'juan.perez@email.com', 'usuario1'),
(2345678, 'Marta', 'Gómez', '1985-05-20', 'Avenida Secundaria 456', 987654321, 'marta.gomez@email.com', 'usuario2'),
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
(2023, 1, '2023-01-01', '2023-06-30');

show tables;

select * from funcionarios;

select fch_agenda from agenda where ci = 1234567;

insert into agenda (ci, fch_agenda) values (12314324, '2023-01-15');

drop table agenda;

INSERT INTO logins (logId, password) VALUES ('usuario912',
     md5('123'));



INSERT INTO funcionarios (ci, nombre, apellido, fch_nacimiento, direccion, telefono, email, logId) VALUES ( 12345678, 'Lucas', 'Juanico', '1971-1-12', 'Av. Italia 1234', 12432,  'a@gmail.com', 'usuario21');



INSERT INTO funcionariosUcu (ci, nombre, apellido, fch_nacimiento, direccion, telefono, email)
VALUES(1234567, 'Juan', 'Pérez', '1990-05-15', 'Calle 123', 5551234, 'juan.perez@ucu.edu.uy'),
       (3456789, 'Carlos', 'Rodríguez', '1982-03-10', 'Calle 789', 5559876, 'carlos.rodriguez@ucu.edu.uy'),
       (2345678, 'María', 'Gómez', '1985-09-22', 'Avenida 456', 5555678, 'maria.gomez@ucu.edu.uy'),
       (1284567, 'Juan', 'Perez', '1990-01-15', 'Calle Principal 123', 123456789, 'juan.perez@email.com'),
       (2345671, 'Marta', 'Gómez', '1985-05-20', 'Avenida Secundaria 456', 987654321, 'marta.gomez@email.com'),
       (3456782, 'Carlos', 'López', '1988-11-10', 'Ruta 789', 555123456, 'carlos.lopez@email.com');

SELECT * FROM carnet_salud WHERE ci = 2345678;

UPDATE carnet_salud SET fch_emision = '2023-02-01', fch_vencimiento = '2024-02-01', comprobante = "comprobante" WHERE ci = 2345678;


Insert into rol (logId, rol) values ('usuario912', 'funcionario');

select r.rol from rol r left join logins l on l.logId = r.logId where l.logId='usuario912' and l.password=md5('123');

select md5('123');

INSERT INTO agenda (ci, fch_agenda) VALUES (123213 , '2023-02-02');
