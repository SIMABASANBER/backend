import { Router } from "express";
import { findAll, findOne, create, update, destroy, totalUser } from "../controllers/user.controller.js";
import authJWt from "../middleware/authJwt.js";

const userRouter = Router()

userRouter.use(authJWt)
userRouter.get('/', findAll)
userRouter.post('/', create)
userRouter.get('/total', totalUser)
userRouter.get('/:id', findOne)
userRouter.put('/:id', update)
userRouter.delete('/:id', destroy)

export default userRouter