
import type { Knex } from "knex";


export async function up(knex: Knex) {

    await knex.schema.createTable('users', table=>{
        table.increments()
        table.string('email')
        table.string('password')
        table.string('name')
        table.date('date_of_birth')
        table.timestamps(false,true)
    })
}


export async function down(knex: Knex){

    await knex.schema.dropTable('users')
}

