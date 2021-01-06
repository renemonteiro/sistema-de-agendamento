import {Request, Response} from 'express'
import scheduledBusiness,{ ScheduledBusiness } from '../business/ScheduledBusiness'
import { AuthenticationData } from '../model/User'
import tokenGenerator from '../service/tokenGenerator'
export class ScheduledController{
    constructor(
        public scheduledBusiness: ScheduledBusiness
    ){}
    public async getAllScheduled(req:Request, res:Response){
        try {
            const token: string = req.headers.authorization as string

            const tokenData:AuthenticationData = tokenGenerator.verify(token)

            const result = await scheduledBusiness.getAllScheduled(tokenData.type)

            res.send({result})

        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

    }

    public async createScheduler(req:Request, res:Response){
        try {
            
            const token:string = req.headers.authorization as string
            const tokenData: AuthenticationData = tokenGenerator.verify(token)
            if(tokenData.type !== "NORMAL"){
                throw new Error("Permission denided")
            }

            const result = await scheduledBusiness.createScheduler( tokenData.id, req.body.id)

            res.status(201).send({message:'Agendado com sucesso', result})


        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
            
        }

    }

    public async deleteScheduler(req:Request, res:Response){
        try {
            const token = req.headers.authorization as string
            const tokenData : AuthenticationData = tokenGenerator.verify(token)

            const result = await scheduledBusiness.deleteScheduler(tokenData.id)

            res.end()
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

    }

    public async getMyScheduler(req:Request, res:Response){
       
        try {
            const token = req.headers.authorization as string
            const tokenData : AuthenticationData = tokenGenerator.verify(token)

            const result  = await scheduledBusiness.getMyScheduler(tokenData.id) 

            res.send({result}) 
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }
    }
}
export default new ScheduledController(scheduledBusiness)