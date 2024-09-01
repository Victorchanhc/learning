import { Knex } from "knex";




export class HistoryService {
    constructor (private knex:Knex){
        this.knex
    }

    async getHistory(userName:string){
        const result = await this.knex.select('clubs.name', 'clubs.created_at', 'collections.photo_name', 
                'collections.id', 'users.name as username', 'users.email').from('clubs')
                .innerJoin('collections', 'collections.club_id', 'clubs.id')
                .innerJoin('users', 'users.id', 'collections.user_id')
                .where('users.email', userName);
                return result
    };
}