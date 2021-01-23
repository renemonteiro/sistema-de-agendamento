import scheduledDataBase, {ScheduledDataBase} from "../data/ScheduledDataBase"
import userDataBase,{ UserDataBase } from "../data/UserDataBase"
import {EmailModels} from "../model/EmailModels"

export class ScheduledBusiness{ 
    constructor(
        private scheduledDataBase: ScheduledDataBase
    ){}

    public async createScheduler(id_user:string, id_scheduler:string){
       
        try {

            if(!id_user || !id_scheduler){
                throw new Error("Missin input")
            }

            const quantity  = await scheduledDataBase.avoidRepetition(id_user)   
            const {usuario} = quantity
            if(usuario !== 0){
                throw new Error("Voce tem horário agendado")
            }

            const time = await scheduledDataBase.verifyHour(id_scheduler)
            const {availability} = time
            if(availability !== 0){
                throw new Error("Horário não disponível")
            }


            await this.scheduledDataBase.create(id_user,id_scheduler)
            
            await scheduledDataBase.update(id_scheduler,1)
            
            const user = await scheduledDataBase.getScheduled(id_scheduler)
         
            const {name, email, day, hour,price}  = user
            // await EmailModels.scheduled(name, email, day, hour,price)
            
            return { id_user, id_scheduler}
            
        } catch (error) {
            throw new Error(error.message || error.sqlMessage)
        }

    }

    public async deleteScheduler(token:string){

        try {
            if(!token){
                throw new Error("Missin input")
            }

            const user = await scheduledDataBase.getScheduledById(token)

            const {id} = user
            

            await this.scheduledDataBase.update(id,0)

            await this.scheduledDataBase.deleteScheduler(token)

            return {result: "Cancelado com sucesso!"}

        } catch (error) {
            throw new Error(error.message || error.sqlMessage)
        }
    }

    public async getAllScheduled(nivel:string){

        try {
            if(nivel !== "SUPERADMIN" && nivel !== "ADMIN"){
                throw new Error("permission denided")
            }

            const result = await scheduledDataBase.getAllScheduled()
            return result
        } catch (error) {
            throw new Error(error)
        }

    }

    public async getMyScheduler(token: string){
       
        try {
            if(!token){
                throw new Error("Missin input")
            }

            const {usuario} = await scheduledDataBase.avoidRepetition(token)
            if(!usuario){
                throw new Error("Vocẽ não tem horario marcado")
            }
            const result = await scheduledDataBase.getMyScheduler(token)
            return result
            
        } catch (error) {
            throw new Error(error.message || error.sqlMessage)
        }
    }
}

export default new ScheduledBusiness(scheduledDataBase)