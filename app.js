import express  from "express"
import dotenv from 'dotenv'
import userRoute from "./routes/user.route.js"
import connection from "./models/connection.js";
import authRoute from "./routes/auth.route.js";

import questionsRouter from "./routes/question.route.js";
import loggingMiddleware from "./middleware/loggingMiddleware.js";
const app = express();
dotenv.config()


app.use(express.json()) // untuk mengirim respon json
app.use(express.urlencoded({extended: true})) // unutk mengirim data melalui reques body

app.use(loggingMiddleware)
app.get('/', (req, res) => res.json({msg:'hello'}))
app.use('/user', userRoute)
app.use('/auth', authRoute)
app.use('/question', questionsRouter)



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
  


