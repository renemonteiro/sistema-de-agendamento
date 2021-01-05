import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("scheduler").del();

    // Inserts seed entries
    await knex.schema.raw(`
    insert into scheduler
    values(
        1, '2021-01-05','7',true,'5'
    );
    `)
};
