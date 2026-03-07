-- 1. crear schema a la izquierda
drop schema if exists videoclub cascade;
create schema videoclub;
set schema 'videoclub';

-- 2. creacion de las tablas 

create table pelicula (
id_pelicula serial primary key,
titulo varchar(100) not null,
genero varchar(50),
director varchar(100),
sinopsis text
);

create table copia (
id_copia int primary key,
id_pelicula int references pelicula(id_pelicula)
);

create table socio (
num_socio serial primary key,
dni varchar(20) unique not null,
nombre varchar(50) not null,
apellido_1 varchar(50) not null,
apellido_2 varchar(50),
fecha_nacimiento date,
telefono varchar(20),
email varchar(100)
);

create table direccion (
num_socio int primary key references socio(num_socio),
calle varchar(100),
numero varchar(10),
piso varchar(10),
codigo_postal varchar(10)
);

create table prestamo (
id_prestamo serial primary key,
id_copia int references copia(id_copia),
num_socio int references socio(num_socio),
fecha_alquiler date not null,
fecha_devolucion date null
);

-- 3. carga de datos (migracion desde public.tmp_videoclub)

insert into pelicula (titulo, genero, director, sinopsis)
select distinct titulo, genero, director, sinopsis
from public.tmp_videoclub;

insert into copia (id_copia, id_pelicula)
select distinct t.id_copia, p.id_pelicula
from public.tmp_videoclub t
inner join pelicula p on t.titulo = p.titulo;

insert into socio (dni, nombre, apellido_1, apellido_2, fecha_nacimiento, telefono, email)
select distinct dni, nombre, apellido_1, apellido_2, cast(fecha_nacimiento as date), telefono, email
from public.tmp_videoclub;

insert into direccion (num_socio, calle, numero, piso, codigo_postal)
select distinct s.num_socio, t.calle, t.numero, t.piso, t.codigo_postal
from public.tmp_videoclub t
inner join socio s on t.dni = s.dni
where t.calle is not null;

insert into prestamo (id_copia, num_socio, fecha_alquiler, fecha_devolucion)
select t.id_copia, s.num_socio, t.fecha_alquiler, t.fecha_devolucion
from public.tmp_videoclub t
inner join socio s on t.dni = s.dni;

-- 4. consulta de copias disponibles

select
p.titulo,
count(c.id_copia) as copias_disponibles
from copia c
inner join pelicula p on c.id_pelicula = p.id_pelicula
where c.id_copia not in (
select id_copia from prestamo where fecha_devolucion is null
)
group by p.titulo
order by copias_disponibles desc;