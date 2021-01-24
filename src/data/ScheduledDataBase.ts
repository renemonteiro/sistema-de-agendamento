import { SchedulerBusiness } from "../business/SchedulerBusiness";
import knex from "./connection";
import { SchedulerDataBase } from "./SchedulerDataBase";

export class ScheduledDataBase{
    protected static tableName:string = "scheduled_user"
    constructor(){}

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

    public async getScheduled(id_scheduler:string){ 
        try {
           const result = await knex.raw(`
            select users.name as name,
            users.email as email,
            users.nickname as nick,
            users.id as id,
            scheduler.day as day,
            scheduler.hours as hour,
            scheduler.price as price
            from scheduled_user
            inner join users on users.id = scheduled_user.id_user
            inner join scheduler on scheduler.id = scheduled_user.id_scheduler
            where scheduler.id = '${id_scheduler}'
            `)
            return result[0][0]
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }

    }

    public async getScheduledById(id:string){
        try {
           const result = await knex.raw(`
            select scheduler.id as id
            from scheduled_user
            inner join users on users.id = scheduled_user.id_user
            inner join scheduler on scheduler.id = scheduled_user.id_scheduler
            where users.id = '${id}'
            `)
            return result[0][0]
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    } 

    public async getMyScheduler(id:string){
        try {
            const result = await knex.raw(`
             select scheduler.day as day,
             scheduler.hours as hour,
             scheduler.price as price
             from scheduled_user
             inner join users on users.id = scheduled_user.id_user
             inner join scheduler on scheduler.id = scheduled_user.id_scheduler
             where users.id = '${id}'
             `)
             return result[0][0]
         } catch (error) {
             throw new Error(error.sqlMessage || error.message)
         }


    }

    public async verifyHour(id_scheduled:string){
        try {
            const hour = await knex.raw(`
            select availability 
            from scheduler
            where id = '${id_scheduled}'
            `)
            return hour[0][0]
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async avoidRepetition(id:string){
        try {
            const result = await knex.raw(`
            select count(id_user) as usuario from ${ScheduledDataBase.tableName}
            where id_user = '${id}'
            `)
            return result[0][0]
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async create(id_user:string, id_scheduler:string){
        try {
            await knex.raw(`
            insert into ${ScheduledDataBase.tableName}
            values('${id_user}','${id_scheduler}')
            `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }

    }

    public async update(id_scheduler:string, number:number){
        try {
            await knex.raw(`
            update scheduler
            set availability = '${number}'
            where id = '${id_scheduler}'
            `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async deleteScheduler(id:string){
        try {
            await knex.raw(`
            delete from scheduled_user
            where id_user = '${id}'
            `)
            

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}

export default new ScheduledDataBase()