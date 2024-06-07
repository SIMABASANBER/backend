import { Router } from "express";
import { findAll, findOne, create, update, destroy } from "../controllers/question.controller.js";

const questionsRouter = Router()

questionsRouter.get('/', findAll)
questionsRouter.post('/', create)
questionsRouter.get('/:id', findOne)
questionsRouter.put('/:id', update)
questionsRouter.delete('/:id', destroy)

export default questionsRouter