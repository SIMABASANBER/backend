import { Router } from "express";
import { findRangking, totalRangking } from "../controllers/rangking.controller.js";
import authJWt from "../middleware/authJwt.js";

const rangkingRouter = Router()

rangkingRouter.use(authJWt)
rangkingRouter.get('/', findRangking)
rangkingRouter.get('/total', totalRangking)


export default rangkingRouter