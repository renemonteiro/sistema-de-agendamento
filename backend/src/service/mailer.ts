import SMTPTransport from 'nodemailer/lib/smtp-transport'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import Mail from 'nodemailer/lib/mailer'

dotenv.config()

export class Email{
    public static config:SMTPTransport.Options = {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASSWORD
        }    

    }

    public static transporter = nodemailer.createTransport(Email.config)

    public static Send = async(from: string,to: string,subject: string,text: string,html: string)=>{
        const mailContent: Mail.Options = {from, to, subject, text, html}

        Email.transporter.sendMail(mailContent,(error:Error | null, info:any)=>{
            if(error){
                throw new Error(error.message)
            }else{
                console.log('e-mail enviado')
            }
        })
    }
    
}
export default new Email()