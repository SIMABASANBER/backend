import express  from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoute from "./routes/user.route.js"
import connection from "./models/connection.js";
import answerRouter from "./routes/answer.route.js";
import authRoute from "./routes/auth.route.js";
import questionsRouter from "./routes/question.route.js";
import loggingMiddleware from "./middleware/loggingMiddleware.js";
import rangkingRouter from "./routes/rangking.route.js";



const app = express();
dotenv.config()

//konfigurasi Cors
const corsOption = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-type', 'Authorization']

}

app.use(cors(corsOption));

app.use(express.json()) // untuk mengirim respon json
app.use(express.urlencoded({extended: true})) // unutk mengirim data melalui reques body

app.use(loggingMiddleware)
app.get('/', (req, res) => res.json({msg:'hello'}))
app.use('/user', userRoute)
app.use('/auth', authRoute)
app.use('/question', questionsRouter)
app.use('/answer', answerRouter)
app.use('/rangking', rangkingRouter)



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`) 
})

connection.getConnection((err) => {
    if (err) {
      console.error('Error connecting to database', (err));
      console.log(err);
      return;
    }
    console.log('Connected to mysql successfuly');
  });
  


