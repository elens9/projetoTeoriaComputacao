create database corpflow_db character set utf8mb4 collate utf8mb4_unicode_ci;

use corpflow_db;

create table tarefas(
	id int auto_increment primary key,
    tarefa varchar(50) not null,
    descricao varchar(300) not null,
    prazo date not null
);

select * from tarefas;