import { HistoryService } from "../services/HistoryService";
import { Request , Response } from 'express'

export class HistoryController {
    constructor (private historyService:HistoryService){}

     getHistory = async (req: Request, res: Response)=> {
        try {

            const userName = req.session.user as string

            if (userName !== undefined) {
                const result = await this.historyService.getHistory(userName)
                res.json(result)
            } else {
                res.json('Please Log in !')
    
            }
    
        } catch (err) {
            // console.log(err)
            res.status(500).json({ msg: "cannot not get file" })
        }
    }
}