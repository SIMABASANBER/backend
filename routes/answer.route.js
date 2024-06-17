import { Router } from "express";
import {findAll, findOne, checkAnswer} from "../controllers/answer.controller.js"
import autJWt from "../middleware/authJwt.js";

const answerRouter = Router()
answerRouter.use(autJWt)
answerRouter.get('/', findAll)
answerRouter.get('/:id', findOne)
answerRouter.post('/:id', checkAnswer)

export default answerRouter