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
    ci             integer,
    nombre         varchar(50),
    apellido       varchar(50),
    fch_nacimiento date,
    direccion      varchar(50),
    telefono       varchar(50),
    email          varchar(50),
    logId          varchar(50),
    primary key (ci),
    foreign key (logId) references logins (logId)
);

-- Tabla de los funcionarios de la ucu
create table funcionariosUcu
(
    ci             integer,
    nombre         varchar(50),
    apellido       varchar(50),
    fch_nacimiento date,
    direccion      varchar(50),
    telefono       varchar(50),
    email          varchar(50),
    primary key (ci)
);

-- Tabla agenda
create table agenda
(
    nro        integer auto_increment,
    ci         integer,
    fch_agenda date,
    primary key(nro)
);

-- Tabla carnet salud
create table carnet_salud(
    ci integer,
    fch_emision date,
    fch_vencimiento date,
    comprobante varchar(500),
    primary key (ci,fch_emision)
);


-- Tabla de las personas que deben completar el formulario
create table actualizar
(
    ci             integer,
    nombre         varchar(50),
    apellido       varchar(50),
    fch_nacimiento date,
    direccion      varchar(50),
    telefono       varchar(50),
    email          varchar(50),
    primary key (ci)
);

-- Tabla periodos_actualizacion
create table periodos_actualizacion
(
    ano        year,
    semestre   integer,
    fch_inicio date,
    fch_fin    date,
    primary key (ano, semestre, fch_inicio, fch_fin)
);

-- Tabla de roles
create table rol
(
    logId varchar(50),
    rol   varchar(50) check (rol in ('admin', 'funcionario')),
    primary key (logId),
    foreign key (logId) references logins(logId)
);

-- Habilita los eventos
SET GLOBAL event_scheduler = ON;

DELIMITER //
-- Creo procedimiento
create procedure actualizar()
    begin
        -- Borrar datos de la tabla que vamos a usar para los que no entregaron el formulario todavia
        delete from actualizar where ci is not null;
        -- Insertar los nuevos datos en la tabla
        insert into actualizar(ci, nombre, apellido, fch_nacimiento, direccion, telefono, email) select fU.ci, fU.nombre, fU.apellido, fU.fch_nacimiento, fU.direccion, fU.telefono, fU.email from funcionariosUcu fU left join funcionarios on funcionarios.ci = fU.ci where funcionarios.ci is null;
    end //

DELIMITER ;


DELIMITER //
-- Creo el evento para cada 24 horas actualice los datos
CREATE EVENT IF NOT EXISTS actualizarCada24h
ON SCHEDULE every 1 day starts '2023-11-26 14:00:00' + INTERVAL 1 day
DO
begin
    call actualizar();
end //

DELIMITER ;



-- DATOS DE PRUEBA
-- Insertando administrador
insert into logins(logId, password) values ('admin', md5('admin'));
insert into rol (logId, rol) VALUES ('admin','admin');
insert into funcionariosUcu(ci, nombre, apellido, fch_nacimiento, direccion, telefono, email)
values (1,'admin','admin', CURRENT_DATE, 'domicilio admin','099099099','admin@email.com');
insert into funcionarios(ci, nombre, apellido, fch_nacimiento, direccion, telefono, email)
values (1,'admin','admin', CURRENT_DATE, 'domicilio admin','099099099','admin@email.com');
insert into carnet_salud(ci, fch_emision, fch_vencimiento, comprobante) values (1,current_date,current_date, 'c:/comprobante');

-- Insertando funcionariosUcu
insert into funcionariosUcu(ci, nombre, apellido, fch_nacimiento, direccion, telefono, email)
values (56789123,'F5','F5', CURRENT_DATE, 'D5','095095095','email5@email.com'),
       (23456789,'F2','F2', CURRENT_DATE, 'D2','092092092','email2@email.com'),
       (34567891,'F3','F3', CURRENT_DATE, 'D3','093093093','email3@email.com'),
       (45678912,'F4','F4', CURRENT_DATE, 'D4','094094094','email4@email.com'),
       (67891234,'F6','F6', CURRENT_DATE, 'D6','096096096','email6@email.com'),
       (78912345,'F7','F7', CURRENT_DATE, 'D7','097097097','email7@email.com'),
       (89123456,'F8','F8', CURRENT_DATE, 'D8','098098098','email8@email.com'),
       (91234567,'F9','F9', CURRENT_DATE, 'D9','099099099','email9@email.com');


-- Insertando primer periodo del 1/11 al 15/11
insert into periodos_actualizacion(ano, semestre, fch_inicio, fch_fin) values (2023,2,'2023-11-01','2023-11-15');

-- Para que la tabla este cargada por primera vez
call actualizar();
