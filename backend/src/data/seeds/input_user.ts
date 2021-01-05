import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    
    await knex.schema.raw(`
        insert into users
        values(
            '1','René', 'Ren','rene@hotmail.com','ADMIN', 'RENE'
        );
    `)
};
