import express from 'express'
import UserController  from '../controller/UserController' 


export const user = express.Router()


user.post("/user/createadmin",          UserController.createAdmin) 
user.post("/user/signup",               UserController.signup) 
user.post("/user/login",                UserController.login) 
user.put("/user/update/:id",            UserController.update) 
user.delete("/user/delete/:id",         UserController.delete) 

