import { Router } from "express";
import { findAll, findOne, create, update, destroy } from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.get('/', findAll)
userRouter.post('/', create)
userRouter.get('/:id', findOne)
userRouter.put('/:id', update)
userRouter.delete('/:id', destroy)
export default userRouter