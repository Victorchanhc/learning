import type { Knex } from "knex";


export async function up(knex: Knex) {

    await knex.schema.createTable('collections', table=>{
        table.increments()
        table.integer('user_id').unsigned()
        table.foreign('user_id').references('users.id').onUpdate('CASCADE').onDelete('CASCADE')
        table.integer('club_id').unsigned()
        table.foreign('club_id').references('clubs.id').onUpdate('CASCADE').onDelete('CASCADE')
        table.string('photo_name')
        table.timestamps(false,true)
    })
}



export async function down(knex: Knex) {

    await knex.schema.dropTable('collections')
}

