import knex from './connection';
import {inputUpdateUser, InputUser, User} from '../model/User'


export class UserDataBase {
    protected static tableName: string = "users";

    private toModel(dbModel?: any): User | undefined {  
        return (
           dbModel &&
           new User(
              dbModel.id,
              dbModel.name,
              dbModel.nichname,
              dbModel.email,
              dbModel.type,
              dbModel.pass,
           )
        );
     }

    public async createUser(input:InputUser){
        const { id, name, nickname, email, type, passEncryp} = input
        try {
            await knex.raw(`
            INSERT INTO ${UserDataBase.tableName} 
                VALUES (
                '${id}', 
                '${name}', 
                '${nickname}',
                '${email}', 
                '${type}', 
                '${passEncryp}') 
            `);
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        } 
    }

    public async getUserByEmail(email:string):Promise<User | undefined>{        
        
        try {
            
            const result = await knex.raw(`
            SELECT * FROM ${UserDataBase.tableName}
            WHERE email = '${email}';
            `)
            return this.toModel(result[0][0])
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
        
    }
    
    public async updateUser(input:inputUpdateUser){
        const {id, name, nickname, email} = input
        try {
            if(email){
                await knex.raw(`
                update ${UserDataBase.tableName}
                set email='${email}' 
                where id = '${id}'
                `)
            }
            if(name){
                await knex.raw(`
                update ${UserDataBase.tableName}
                set name='${name}' 
                where id = '${id}'
                `)
            } 
            if(nickname){
                await knex.raw(`
                update ${UserDataBase.tableName}
                set nickname='${nickname}' 
                where id = '${id}'
                `)
            }
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
    public async getUserById(id:string){
        try {
            const result = await knex.raw(`
            select * from ${UserDataBase.tableName}
            where id = '${id}';
            `)
            return this.toModel(result[0][0])
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
    public async deleteUser(tokenId:string){
        try {
            await knex.raw(`
            delete from ${UserDataBase.tableName}
            where id = '${tokenId}';
            `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

}

export default new UserDataBase()