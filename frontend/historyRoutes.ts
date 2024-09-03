import express from 'express'
import {historyController, knex } from './app'

declare module 'express-session' {
    interface SessionData {
        name?: string
        user?: string
        username?: string 
    }
}

export function getHistoryRoutes(){
    const historyRoutes = express.Router()
    historyRoutes.get('/', historyController.getHistory)
    return historyRoutes
}





export async function saveHistory(req: express.Request, res: express.Response) {
    try {
        await knex('collections').update({
            photo_name: req.body.file_name,
            updated_at: 'now()'
        })
            .updateFrom('users')
            .where('users.email', req.session.user)
            .where('collections.club_id', req.body.club_id)

        res.json('update complete')

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "cannot not get file" })
    }
}

export async function deleteHistory(req: express.Request, res: express.Response) {
    try {
        const id = req.body.id
        await knex('collections').update({
            photo_name: ''
        }).where('id', id)

        const fs = require('fs');
        const fileName = req.body.photo_name

        fs.unlink(`./public/uploads/${fileName}`, function () {
            console.log(`${fileName} is  Deleted`)
        });

        res.json('History deleted')
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "cannot not delete clubs" })
    }

}