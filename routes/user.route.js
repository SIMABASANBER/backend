import { Router } from "express";
import { findAll, findOne, create, update, destroy } from "../controllers/user.controller.js";
import autJWt from "../middleware/authJwt.js";

const userRouter = Router()

userRouter.use(autJWt)
userRouter.get('/', findAll)
userRouter.post('/', create)
userRouter.get('/:id', findOne)
userRouter.put('/:id', update)
userRouter.delete('/:id', destroy)

export default userRouter