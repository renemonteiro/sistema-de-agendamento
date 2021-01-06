import express, {Express} from 'express'
import cors from 'cors'
import { router } from './routes/userRouter'
import { router1 } from './routes/scheduler'
import { router2 } from './routes/scheduled'



const app : Express = express() 
app.use(express.json())
app.use(cors())
app.use(router)
app.use(router1)
app.use(router2)


app.listen(process.env.PORT || 3003,()=>{
    console.log('Servidor rodando na porta 3003')
})