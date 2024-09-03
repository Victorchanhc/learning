import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("clubs").del();
    await knex("users").del();
    await knex("collections").del();

    // Inserts seed entries
    const clubIds: { id: number}[] = await knex("clubs").insert([
        { name: "Manchester United", division : "premier"},
        { name: "Liverpool", division : "premier"},
        { name: "Manchester City", division : "premier"}
    ])
    .returning('id')
    ;

    // Same as clubs
    await knex("users").insert([
        { email: "abc@gmail.com", password : "123456", name:"Tester", date_of_birth:"1985-08-08"},
        { email: "def@gmail.com", password : "456789", name:"Tester2", date_of_birth:"1982-08-08"},
        { email: "ghi@gmail.com", password : "123789", name:"Tester3", date_of_birth:"1980-08-08"}
    ]);

    await knex("collections").insert([
        { user_id: "1", club_id : clubIds[0], photo_name : "82171ca6ea2d30e17ba9e6b00.jpeg"},
        { user_id: "1", club_id : clubIds[1], photo_name : ""},
        { user_id: "1", club_id : clubIds[2], photo_name : ""},
        { user_id: "2", club_id : "1", photo_name : ""},
        { user_id: "2", club_id : "2", photo_name : ""},
        { user_id: "2", club_id : "3", photo_name : ""},
        { user_id: "3", club_id : "1", photo_name : ""},
        { user_id: "3", club_id : "2", photo_name : "d4d4b499ddfe2b4272a351d00.jpeg"},
        { user_id: "3", club_id : "3", photo_name : ""}

    ]);
};
