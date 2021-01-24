import schedulerDataBase, { SchedulerDataBase } from "../data/SchedulerDataBase";
import idGenerator, { IdGenerator } from "../service/idGenerator";




export class SchedulerBusiness{
    constructor(
        private idGenerator:IdGenerator,
        private schedulerDataBase: SchedulerDataBase
       
       
    ){} 
    public async getAvailableScheduler(){

        try {
           

            const result = await schedulerDataBase.getAvailableScheduler()
            return result
        } catch (error) {
            throw new Error(error)
        }

    }

    public async createScheduler(day:Date, hours:Number, price:Number ){
        try {
            if(!day || !hours || !price){
                throw new Error("Missin input")
            }

            const id = this.idGenerator.generate()
            const availability = 0
            const input = {id, day, hours, availability, price}

            const [count] = await schedulerDataBase.avoidRepetition(day,hours) 
            
            const exist = count[0].verify

            if(exist !== 0){
                throw new Error("Horário já cadastrado")
            }


            await this.schedulerDataBase.createScheduler(input)
            

            const inputScheduler = {id, day, hours, availability, price}

            return { inputScheduler }

            
        } catch (error) {
            throw new Error(error.message || error.sqlMessage)
        }
    }

    public async deleteScheduler(id:string, nivel:string){
        
        try { 
            
            if(!id || !nivel){
                throw new Error("Missin input")
            }
    
            if(nivel !== 'ADMIN' && nivel !== 'SUPERADMIN'){
                throw new Error("Permission Denided")
            }

            const {id_agenda}  = await this.schedulerDataBase.avoidRepetitionId(id)
            
            if(!id_agenda){
                throw new Error("no time scheduled")
            }
    
            await this.schedulerDataBase.deleteScheduler(id)

    
            return "horário excluido"


        } catch (error) {
            throw new Error(error)
        }
    }
}

export default new SchedulerBusiness(idGenerator,schedulerDataBase)