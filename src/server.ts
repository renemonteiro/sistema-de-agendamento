import express, {Express} from 'express'
import cors from 'cors'
import { user } from './routes/userRouter'
import { scheduler } from './routes/scheduler'
import { scheduled } from './routes/scheduled'



const app : Express = express() 
app.use(express.json())
app.use(cors())
app.use(user)
app.use(scheduler)
app.use(scheduled)


app.listen(process.env.PORT || 3003,()=>{
    console.log('Servidor rodando na porta 3003')
})