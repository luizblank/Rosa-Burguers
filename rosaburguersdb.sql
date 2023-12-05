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
	Nome varchar(100) not null,
	Descricao varchar(MAX) not null,
	Tipo varchar (20) not null,
	Preco float not null
);
go

create table Pedido(
	ID int identity primary key,
	Usuario int references Usuario(ID) not null,
	NomeChamada  varchar(50) not null,
	Horario time
);
go

create table ItensPedido(
	ID int identity primary key,
	Produto int references Produto(ID) not null,
	Pedido int references Pedido(ID) not null
);

insert into Usuario values ('Administrador', CONVERT(datetime, '25-08-2017'), 'Outro', 'rosaburguers@gmail.com', 'i+2C5BZkV/+BzzMq3LGN0ZOfL9nKi/hHNWiAPTq2boY=', 'kM8Xgn5lIYzcjEP/9tPHrYlpG9zyLGSG', 1);
go

insert into Usuario values ('Luiz Antonio', CONVERT(datetime, '25-08-2017'), 'Masculino', 'luizrosa@gmail.com', 'i+2C5BZkV/+BzzMq3LGN0ZOfL9nKi/hHNWiAPTq2boY=', 'kM8Xgn5lIYzcjEP/9tPHrYlpG9zyLGSG', 1);
go

insert into Usuario values ('Vit�ria Zago', CONVERT(datetime, '25-08-2017'), 'Feminino', 'zago@gmail.com', 'i+2C5BZkV/+BzzMq3LGN0ZOfL9nKi/hHNWiAPTq2boY=', 'kM8Xgn5lIYzcjEP/9tPHrYlpG9zyLGSG', 1);
go

insert into Produto values ('Batata', 'Batata frita com sal', 'Por��o', 4.99);
go

insert into Produto values ('Refrigerante', 'Free refill', 'Bebida', 6.99);
go

insert into Produto values ('Rosa Burguer', 'P�o rosa, duas carnes, queijo cheddar, molho especial', 'Hamburguer',16.99);
go

insert into Produto values ('Donut Burguer', 'Massa de donut usada de p�o, a�ucar, recheio de chocolate', 'Hamburguer', 20.99);
go

select * from Usuario
go

select * from Produto
go

select * from Pedido
go

select * from ItensPedido
go
