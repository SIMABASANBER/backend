import express  from "express"
import dotenv from 'dotenv'
import userRoute from "./routes/user.route.js"
import connection from "./models/connection.js";
import authRoute from "./routes/auth.route.js";

const app = express();
dotenv.config()


app.use(express.json()) // untuk mengirim respon json
app.use(express.urlencoded({extended: true})) // unutk mengirim data melalui reques body
app.get('/', (req, res) => res.json({msg:'hello'}))
app.use('/user', userRoute)
app.use('/auth', authRoute)




const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`) 
})

connection.getConnection((err) => {
    if (err) {
      console.error('Error connecting to database', (err));
      return;
    }
    console.log('Connected to mysql successfuly');
  });


