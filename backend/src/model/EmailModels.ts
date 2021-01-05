import { Email } from "../service/mailer"
import {InputWelcome, User} from '../model/User'



export class EmailModels{

    public static Welcome = async(input:InputWelcome)=>{
        const {name, nickname, email} = input
        await Email.Send(
             "René Monteiro <renemonteiro@labenu.com>",
            `${email}`,
            `Seja bem vindo, ${name}!`,
            `Bom dia, ${nickname}!`,
            `<p>Seja Bem vindo, ${nickname}!</p>`
        )
    }

    public static userEdited = async(input:any)=>{
        const {name,email}= input
     
       
        await Email.Send(
             "René Monteiro <renemonteiro@labenu.com>",
            `${email}`,
            `Olá, ${name}!`,
            `Bom dia, ${name}!`,
            `<p>Você alterou seu email, ${email}!</p>`
        )

    }
    public static deleteUser = async(input:any)=>{
        const {name,email}= input
     
       
        await Email.Send(
             "René Monteiro <renemonteiro@labenu.com>",
            `${email}`,
            `Olá, ${name}!`,
            `Bom dia, ${name}!`,
            `<p>Você APAGOU sua conta, ${email}!</p>`
        )
        
    }
    public static scheduled =async(name:string,email:string, day:string, hour:string,price:string)=>{
        
        const [dia, data,mes] = day.toString().split(' ')

        await Email.Send(
            "René Monteiro <renemonteiro@labenu.com>",
           `${email}`,
           `Olá, ${name}!`,
           `Bom dia, ${name}!`,
           `<p>Você Agendou um serviço para ${dia} ${mes} ${data} as ${hour}hs.</p>`
       )
    }
}

export default new EmailModels()