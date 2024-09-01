import { Knex } from "knex";
import { HistoryService } from "../services/HistoryService";
import { HistoryController } from "./HistoryController";
import { Request , Response } from 'express'
import { createRequest, createResponse } from "../testing";




describe('HistoryController', ()=>{

    let historyService : HistoryService;
    let historyController : HistoryController;
    let req:Request;
    let res:Response;

    beforeEach(()=>{
        historyService = new HistoryService({} as Knex);
        historyService.getHistory = jest.fn(async()=>[{text : 'Hello'}]);
        req = createRequest()
        res = createResponse()
            
        historyController = new HistoryController(historyService)
    });

    it('Should get history', async()=>{
        
        await historyController.getHistory(req,res);
        
        expect(historyService.getHistory).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith([{text : 'Hello'}]);

    })

    it('Should fail to get history', async()=>{

        historyService.getHistory = jest.fn(()=>{ throw new Error('cannot get history')})
        
        await historyController.getHistory(req,res);
        
        expect(historyService.getHistory).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ msg: "cannot not get file" });

    })
})