import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .raw(`
    create table users(
        id varchar(255) primary key,
        name varchar(255)not null,
        nickname varchar(50)not null,
        email varchar(50)not null unique,
        type enum('NORMAL','ADMIN') default 'NORMAL',
        pass varchar(255)
        
      );
    `)
    .raw(` 
    create table scheduler(
        id varchar(255) primary key,
        day date not null,
        hours int not null,
        availability boolean,
        price int 
      );
    `)
    .raw(`
    
    create table scheduled_user(
        id_user varchar(255) not null,
        id_scheduler varchar(255) not null,
        foreign key (id_user) references users(id),
        foreign key (id_scheduler) references scheduler(id)
      );
    `)
    
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .raw(`drop table scheduled_user;`)
    .raw(`drop table users;`)
    .raw(`drop table scheduler;`)
}

