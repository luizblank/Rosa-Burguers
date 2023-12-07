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
	Preco float not null,
	Tamanho varchar (20)
);
go

create table Pedido(
	ID int identity primary key,
	Codigo varchar(100) not null,
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
insert into Usuario values ('Luiz Antonio', CONVERT(datetime, '25-08-2017'), 'Masculino', 'luizrosa@gmail.com', 'i+2C5BZkV/+BzzMq3LGN0ZOfL9nKi/hHNWiAPTq2boY=', 'kM8Xgn5lIYzcjEP/9tPHrYlpG9zyLGSG', 0);
insert into Usuario values ('Vitória Zago', CONVERT(datetime, '25-08-2017'), 'Feminino', 'zago@gmail.com', 'i+2C5BZkV/+BzzMq3LGN0ZOfL9nKi/hHNWiAPTq2boY=', 'kM8Xgn5lIYzcjEP/9tPHrYlpG9zyLGSG', 0);

insert into Produto values ('batata', 'batata frita com sal', 'porcoes', 4.99, 'grande');
insert into Produto values ('refrigerante', 'free refill', 'bebidas', 6.99, 'grande');
insert into Produto values ('rosa burguer', 'pão rosa, duas carnes, queijo cheddar, molho especial', 'hamburgueres',16.99, null);
insert into Produto values ('donut burguer', 'massa de donut usada de pão, açucar, recheio de chocolate', 'hamburgueres', 20.99, null);
insert into Produto values ('patrick burguer', 'hamburguer do siri cascudo, recheio especial do patrick', 'hamburgueres', 34.99, null);

insert into Produto values ('pink sundae', 'sorvete de baunilha com cobertura rosa', 'sobremesas', 16.89, null);

select * from Usuario
go

select * from Produto
go

select * from Pedido
go

select * from ItensPedido
go
