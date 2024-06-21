import { Router } from "express";
import {findAll, findOne, checkAnswer} from "../controllers/answer.controller.js"
import authJWt from "../middleware/authJwt.js";


const answerRouter = Router()
answerRouter.use(authJWt)
answerRouter.get('/', findAll)
answerRouter.get('/:id', findOne)
answerRouter.post('/:id', checkAnswer)

export default answerRouter