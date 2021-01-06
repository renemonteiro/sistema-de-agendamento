import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("scheduled_user").del();

    // Inserts seed entries
    await knex.schema.raw(`
    insert into scheduled_user
    values(
        1, 1
    );
    `)
};
