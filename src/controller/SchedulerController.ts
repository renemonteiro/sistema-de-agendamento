import {Request, Response} from 'express'
import schedulerBusiness, { SchedulerBusiness } from '../business/SchedulerBusiness';
import { AuthenticationData } from '../model/User';
import tokenGenerator from '../service/tokenGenerator'; 


export class SchedulerController{
    constructor(
        public schedulerBusiness: SchedulerBusiness
    ){}
    public async getAvailableScheduler(req:Request, res:Response){
        try {
            const result = await schedulerBusiness.getAvailableScheduler()
            res.send({result})

        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

    }

    public async createScheduler(req: Request, res:Response){
        try {
            const token: string  = req.headers.authorization as string

            const tokenData: AuthenticationData = tokenGenerator.verify(token)

            const {day, hours, price} = req.body

            const nivel  = tokenData.type

            if(nivel !== 'ADMIN' && nivel !== 'SUPERADMIN'){
                throw new Error("Usuário não autorizado")
            }

            const result =  await schedulerBusiness.createScheduler(
                day,
                hours,
                price 
            )
            res.status(201).send({message:'Horário Criado', result})
            
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage)
            
        }

    }

    public async deleteScheduler(req:Request, res:Response){
        try {

            
            const token: string = req.headers.authorization as string

            const tokenData:AuthenticationData = tokenGenerator.verify(token)        

            // const result =  await schedulerBusiness.deleteScheduler(req.body.id,tokenData.type)
            const result =  await schedulerBusiness.deleteScheduler(
                req.body.id,
                tokenData.type)
            
            res.send({result})
            
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
            
        }

    }

}

export default new SchedulerController(schedulerBusiness)