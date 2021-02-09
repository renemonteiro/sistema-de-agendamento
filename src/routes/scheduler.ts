import express from 'express'
import SchedulerController from '../controller/SchedulerController'

export const scheduler = express.Router()


scheduler.get("/scheduler/all",              SchedulerController.getAvailableScheduler) 
scheduler.post("/scheduler/add",             SchedulerController.createScheduler) 
scheduler.delete("/scheduler/del/:id",       SchedulerController.deleteScheduler)  



