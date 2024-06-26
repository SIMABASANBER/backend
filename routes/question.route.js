import { Router } from "express";
import { findAll, findOne, create, update, destroy, totalQuestion, getAllQuestionAdmin } from "../controllers/question.controller.js";
import authJWt from "../middleware/authJwt.js";

const questionsRouter = Router()

questionsRouter.use(authJWt)
questionsRouter.get('/', findAll)
questionsRouter.get('/admin', getAllQuestionAdmin)
questionsRouter.post('/', create)
questionsRouter.get('/total', totalQuestion)
questionsRouter.get('/:id', findOne)
questionsRouter.put('/:id', update)
questionsRouter.delete('/:id', destroy)

export default questionsRouter