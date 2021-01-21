import express from 'express'
import SchedulerController from '../controller/SchedulerController'

export const router1 = express.Router()


router1.get("/scheduler/all",              SchedulerController.getAvailableScheduler) 
router1.post("/scheduler/add",             SchedulerController.createScheduler) 
router1.delete("/scheduler/del/:id",       SchedulerController.deleteScheduler)  



