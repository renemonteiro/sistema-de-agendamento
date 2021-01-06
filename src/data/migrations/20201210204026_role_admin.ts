import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.raw(`
    alter table users
    modify column type enum("SUPERADMIN","NORMAL","ADMIN") default "NORMAL";
    `)
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.raw(`
    alter table users
    modify column type enum("NORMAL","ADMIN") default "NORMAL";
    `)
}

