import userDataBase, {UserDataBase} from '../data/UserDataBase'
import { EmailModels } from '../model/EmailModels'
import hashGenerator, { HashGenerator } from '../service/hashGenerator'
import idGenerator, { IdGenerator } from '../service/idGenerator'
import tokenGenerator, { TokenGenerator } from '../service/tokenGenerator'


export class UserBusiness{ 
   
    constructor(
        private idGenerator: IdGenerator,
        private hashGenerator: HashGenerator,
        private tokenGenerator: TokenGenerator, 
        private userDataBase: UserDataBase,
    ){}

    public async signup(name:string, nickname:string, email:string, type:string, pass:string){
        try {
            if(!name || !nickname || !email || !type || !pass){
                throw new Error("Missin input")
            }
            if(pass.length < 6){
                throw new Error("Short Password")
            }
            if(type !== "ADMIN" &&  type !== "NORMAL" && type!== "SUPERADMIN"){
                throw new Error("Just works with 'ADMIN' or 'NORMAL'")
            }

            const id = this.idGenerator.generate() 
            const passEncryp = await this.hashGenerator.hash(pass)

            const input = {id, name, nickname, email, type, passEncryp}

            await userDataBase.createUser(input)

            const inputEmail = {name,nickname,email}
            
            // await EmailModels.Welcome(inputEmail)

            const token = this.tokenGenerator.generate({id, type})
                        
            return {token}
        } catch (error) {
            throw new Error(error.message || error.sqlMessage)
        }

    }

    public  async login(email: string, pass:string){
        
        try {
            if(!email || !pass){
                throw new Error("Missin input")
            }
            
           
            const user = await this.userDataBase.getUserByEmail(email)
            

            if(!user){
                throw new Error("No User find")
            }

            const isPass:boolean = await this.hashGenerator.compareHash(pass,user.getPass())

            if(!isPass){
                throw new Error("Password or email incorrect")
            }
            const token = this.tokenGenerator.generate({id: user.getId(), type:user.getType()})

            return {token}
        } catch (error) {
            throw new Error(error)
            
        }
    }

   
    public async updateUser(id:string,name:string,nickname:string,email:string){
        try {
            if(!id || (!name && !nickname && !email)){
                throw new Error("Missin input")
            }

            const input = {id, name, nickname, email}
            
            const user = await this.userDataBase.getUserById(id)
            
            const values = {name:user?.getName(), email:user?.getEmail(), nickname:user?.getNickname()}

            await this.userDataBase.updateUser(input)
            
            await EmailModels.userEdited(values) 

            return "Cadastro Atualizado"
        } catch (error) {
            throw new Error(error)
        }
    }
    public async deleteUser(tokenId:string){
    
        try {
           
            if(!tokenId){
                throw new Error("Missing input")
            }

            const user = await this.userDataBase.getUserById(tokenId)
            
            const input = {name:user?.getName(), email:user?.getEmail(), nickname:user?.getNickname()}
           
            await this.userDataBase.deleteUser(tokenId)
            
            await EmailModels.deleteUser(input) 
            
            return "usuário excluido"
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default new UserBusiness(idGenerator, hashGenerator,tokenGenerator, userDataBase )