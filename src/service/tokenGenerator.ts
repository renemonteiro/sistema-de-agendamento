import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { AuthenticationData } from '../model/User'

dotenv.config()

export class TokenGenerator{
    private static expiresIn: number = 2400

    public generate = (input:AuthenticationData):string =>{
        return jwt.sign(input,process.env.JWT_KEY as string,{expiresIn: TokenGenerator.expiresIn})
    }
    public verify(token:string):AuthenticationData{
        return jwt.verify(token, process.env.JWT_KEY as string) as AuthenticationData
    }
}

export default new TokenGenerator()