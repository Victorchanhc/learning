import express from 'express'
import formidable from 'formidable'
import fs from 'fs'
import { parse } from './util'
import expressSession from 'express-session'
import dotenv from 'dotenv'
import Knex from 'knex';
import { loginRoutes } from './loginRoutes';
import { userRoutes } from './userRoutes';
// import { isLoggedIn } from './guard'

import { getUser } from './userRoutes'
import { isLoggedIn } from './guard'
import { HistoryService } from './services/HistoryService'
import { HistoryController } from './controllers/HistoryController'
import { deleteHistory,getHistoryRoutes,saveHistory} from './historyRoutes'

// import { Request, Response } from 'express'
const uploadDir = 'public/uploads'
fs.mkdirSync(uploadDir, { recursive: true })

let counter = 0;

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    expressSession({
        secret: 'learning premier league',
        resave: true,
        saveUninitialized: true,
    }),
)

declare module 'express-session' {
    interface SessionData {
        name?: string
        user?: string
        username?: string 
    }
}

dotenv.config()

const knexConfigs = require("./knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
export const knex = Knex(knexConfig);

export let historyService = new HistoryService(knex)
export let historyController = new HistoryController(historyService)



app.use(express.static('public'))

app.post('/find', async (req, res) => {
    
    try {
        const form = await formidable({
            uploadDir,
            keepExtensions: true,
            maxFiles: 1,
            maxFileSize: 200 * 1024 * 1024, // the default limit is 200KB
            filter: part => part.mimetype?.startsWith('image/') || false,
            filename: (originalName, originalExt, part, form) => {
                let fieldName = part.name
                let timestamp = Date.now()
                let ext = part.mimetype?.split('/').pop()
                counter++
                return `${fieldName}-${timestamp}-${counter}.${ext}`
            },
        })
        
        const [_, files] = await parse(form, req)
        const target = (files.Logo as formidable.File).newFilename
        const result = await fetch('https://python.learningpremierleague.com', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ file_name: target })
        })
        console.log('complete')
        const output = await result.json()
        
        console.log(output)
        res.json(output)

    }catch(err){
        console.log(err)
        res.status(500).json({ msg: "cannot not get file" })


    }
        
    // const fs = require('fs');
    
    // fs.unlink(`./uploads/${target}`, function () {
    //     console.log(`${target} is  Deleted`)
    // });
        

})

app.post('/login', loginRoutes)
app.use('/history', getHistoryRoutes())
app.use('/deleteClub', deleteHistory)
app.use('/getUser', getUser)

app.use('/getUser', userRoutes)
app.put('/editUser', userRoutes)
app.post('/register', userRoutes)
app.put('/savePhoto', isLoggedIn , saveHistory)

app.use('/deletePhoto', async(req, res)=>{
    const fs = require('fs');
    const fileName = req.body.file_name
    
    fs.unlink(`./public/uploads/${fileName}`, function () {
        console.log(`${fileName} is  Deleted`)
    });

    res.json('Photo Delete')
})

app.get('/logout', loginRoutes)



const PORT = 8080

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`)
})