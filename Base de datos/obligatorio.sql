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
    primary key (logId)
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
    nro        integer,
    ci         integer(7),
    fch_agenda date,
    primary key(nro)
);

-- Tabla carnet salud
create table carnet_salud(
    ci integer,
    fch_emision date,
    fch_vencimiento date,
    comprobante blob,
    primary key (ci,fch_emision)
);

-- Tabla periodos_actualizacion
create table periodos_actualizacion(
    año year,
    semestre integer check(semestre in (1,2)),
    fch_inicio date,
    fch_fin date,
    primary key (año, semestre, fch_inicio, fch_fin)
);