
import type { Knex } from "knex";


export async function up(knex: Knex) {

    // Can create multiple tables at once
    await knex.schema.createTable('users', table=>{
        table.increments()
        table.string('email')
        table.string('password')
        table.string('name')
        table.date('date_of_birth')

        //table.boolean('is_deleted') // may not comply with modern data law

        table.timestamps(false,true)
    })

    // Create a new user called dummy_user, assign users.id of dummy_user to deleted user.

}


export async function down(knex: Knex){

    await knex.schema.dropTable('users')
}

