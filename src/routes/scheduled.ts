import express from 'express'
import ScheduledController  from '../controller/ScheduledController.'

export const router2 = express.Router()



router2.get("/scheduled/all",              ScheduledController.getAllScheduled) 
router2.get("/scheduled/user/:id",         ScheduledController.getMyScheduler) 
router2.post("/scheduled/user",            ScheduledController.createScheduler) 
router2.delete("/scheduled/user/del/:id",  ScheduledController.deleteScheduler) 