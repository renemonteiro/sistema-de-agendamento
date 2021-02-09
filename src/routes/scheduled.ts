import express from 'express'
import ScheduledController  from '../controller/ScheduledController.'

export const scheduled = express.Router()

scheduled.get("/scheduled/all",              ScheduledController.getAllScheduled) 
scheduled.get("/scheduled/user/:id",         ScheduledController.getMyScheduler) 
scheduled.post("/scheduled/user",            ScheduledController.createScheduler) 
scheduled.delete("/scheduled/user/del/:id",  ScheduledController.deleteScheduler) 