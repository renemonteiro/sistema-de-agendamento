import express from 'express'
import UserController  from '../controller/UserController' 


export const router = express.Router()


router.post("/user/createadmin",          UserController.createAdmin) 
router.post("/user/signup",               UserController.signup) 
router.post("/user/login",                UserController.login) 
router.put("/user/update/:id",            UserController.update) 
router.delete("/user/delete/:id",         UserController.delete) 

