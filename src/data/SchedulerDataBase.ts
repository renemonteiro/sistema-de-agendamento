import knex from './connection'
import {InputScheduler, Scheduler} from '../model/Scheduler'


export class SchedulerDataBase{
    
    protected static tableName:string = "scheduler"
    
    private toModelScheduler(dbModel?:any): Scheduler | undefined{
        return (
            dbModel &&
           new Scheduler(
              dbModel.id,
              dbModel.day,
              dbModel.hours,
              dbModel.availability,
              dbModel.price,
           )

        )

    }
    public async getAvailableScheduler():Promise <any>{
        try {
            const result = await knex.raw(`
            select id as id,
            hours as hours,
            price as price,
            day as day,
            availability as availability
            from scheduler
            order by day asc;
            `)
            return result[0]
        } catch (error) {
            throw new Error(error)

        }
    }
    public async getAllScheduled():Promise <any>{
        try {
            const result = await knex.raw(`
            select users.name as name,
            users.email as email,
            scheduler.day as dia,
            scheduler.hours as hora,
            scheduler.price as preco
            from scheduled_user
            inner join users on users.id = scheduled_user.id_user
            inner join scheduler on scheduler.id = scheduled_user.id_scheduler;
            `)
            return result[0]
        } catch (error) {
            throw new Error(error)

        }
    }

    public async getSchedulerById(id:string){
        try {
            const result = knex.raw(`
            select * from ${SchedulerDataBase.tableName}
            where id = '${id}';
            `)
            return this.toModelScheduler(result)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }

    }

    public async avoidRepetition(day:Date, hours:Number): Promise<any>{

        try {
            const result = knex.raw(`
            select count(day and hours) as verify from ${SchedulerDataBase.tableName}
            where day = '${day}' and 
            hours = '${hours}';
            `)
                       
            return result
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }

    }

    public async avoidRepetitionId(id:string){
        try {
            const result = await knex.raw(`
            select count(id) as id_agenda from ${SchedulerDataBase.tableName}
            where id = '${id}'
            `)
            return result[0][0]
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async createScheduler(input: InputScheduler){
        const {id, day, hours, availability, price} = input
        try {
            await knex.raw(`
            insert into ${SchedulerDataBase.tableName}
            values(
                '${id}',
                '${day}',
                '${hours}',
                '${availability}',
                '${price}'
            )
            `)
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async deleteScheduler(id:string){
        try {
            await knex.raw(`
            delete from ${SchedulerDataBase.tableName}
            where id = '${id}';
            `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
            
        }
    }
}
export default new SchedulerDataBase()