use master
go

if exists(select * from sys.databases where name = 'RosaBurguersDB')
	drop database RosaBurguersDB
go

create database RosaBurguersDB
go

use RosaBurguersDB
go

create table Usuario(
	ID int identity primary key,
	Nome varchar(100) not null,
	DataNasc datetime not null,
	Sexo varchar(15) not null,
	Email varchar(100) not null,
	Senha varchar(MAX) not null,
	Salt varchar(200) not null,
	Adm bit not null
)
go

create table Imagem(
	ID int identity primary key,
	Foto varbinary(MAX) not null
);
go

create table Produto(
	ID int identity primary key,
	ImagemID int references Imagem(ID),
	Nome varchar(100) not null,
	Descricao varchar(MAX) not null,
	Tipo varchar (20) not null,
	Tamanho varchar(20)
);
go

create table Pedido(
	ID int identity primary key,
	Usuario int references Usuario(ID),
	Produto int references Produto(ID),
	Codigo varchar(20) not null,
	Horario time not null
);
go

insert into Usuario values ('Administrador', CONVERT(datetime, '25-08-2017'), 'Outro', 'RosaBurguers@gmail.com', 'adm', 'adm', 1);
go

select * from Usuario
go