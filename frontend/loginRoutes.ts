import express from "express";
import { knex } from './app'
import { Detail } from "./interface";


export const loginRoutes = express.Router()

loginRoutes.post('/login', login)
loginRoutes.get('/logout', logout)


async function login(req: express.Request, res: express.Response) {

    const userList: Detail[] = await knex.select('users.id', 'users.name', 'users.email', 'users.password')
        .from('users')
        .where('users.email', req.body.email)
    
    // console.log(req.body.password) 
    // Do not console.log password to log
    // Should use Bcrypt
    if(
        userList.some(
            (user) =>
                user.password === req.body.password
        )
    ) {
        req.session.user = req.body.email
        console.log(`${req.session?.user} is Logged in (loginRoutes)`)
        res.redirect('/')
    } else {
        res.redirect('/')
    }
}

function logout(req: express.Request, res: express.Response) {
    req.session.destroy(function () {
        res.redirect('/');
    });
};