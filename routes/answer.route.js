import { Router } from "express";
import {checkAnswer} from '../controllers/answer.controller.js'
import authJWt from "../middleware/authJwt.js";

const answerRouter = Router()

answerRouter.use(authJWt)
answerRouter.post('/:id', checkAnswer)

export default answerRouter