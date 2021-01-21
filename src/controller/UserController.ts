import { Request, Response} from 'express'  
import userBusiness, {UserBusiness} from '../business/UserBusiness'
import { AuthenticationData, InputLogin, inputUpdateUser } from '../model/User'
import tokenGenerator from '../service/tokenGenerator'


export class UserController{
    constructor(
        public userBusiness: UserBusiness
    ){}
    public async createAdmin(req:Request, res: Response){
        try {
            const token:string = req.headers.authorization as string
            
            const tokenData:AuthenticationData = tokenGenerator.verify(token)
            
            const {name, nickname, email, type, pass} = req.body
            const nivel = tokenData.type
            if(nivel !== 'ADMIN' && nivel !=="SUPERADMIN"){
                
                throw new Error("Usuário não autorizado")
            }
            if(nivel === "ADMIN" && type === "SUPERADMIN"){
               
                throw new Error("Usuário não autorizado")
            }

            const result = await userBusiness.signup(
                name,
                nickname,
                email,
                type,
                pass
            )
            res.status(201).send({message:"usuario criado", result})
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage)
        }

    }
    public async signup(req:Request, res: Response){
        try {
            const {name, nickname, email, pass} = req.body 

            const type = "NORMAL"

            const result = await userBusiness.signup( 
                name,
                nickname,
                email,
                type,
                pass
            )
            res.status(201).send({message:"usuario criado", result})
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }

    }
    public async login(req: Request, res:Response){
        try {
            const {email, pass}: InputLogin = req.body 
            const result = await userBusiness.login(email,pass)
            res.status(200).send(result)
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }
    }

    public async update(req:Request, res:Response){
      
        try {
            const token:string = req.headers.authorization as string
            const tokenData:AuthenticationData = tokenGenerator.verify(token)
            
            const result = await userBusiness.updateUser(
                tokenData.id,
                req.body.name,
                req.body.nickname,
                req.body.email,
            )

            res.status(200).send({result})
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }
    }

    public async delete(req:Request, res:Response){
        try {
           

            const token:string = req.headers.authorization as string
            
            const tokenData:AuthenticationData = tokenGenerator.verify(token)

            const result = await userBusiness.deleteUser(tokenData.id)
           
            
          
            res.send({result})


        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
            
        }
    }
}
export default new UserController(userBusiness)