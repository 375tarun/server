import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'
import connectDb from './config/dbConfig.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js'
import testPapersRoutes from './routes/testPapersRoutes.js'
import questionRoutes from './routes/questionRoutes.js'



dotenv.config();

connectDb();

const app = express()

app.use(
  cors({
    origin: "*", // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies from the frontend
  })
);

app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/adminAuth',adminAuthRoutes)
app.use('/api/test',testPapersRoutes)
app.use('/api/question',questionRoutes)


const PORT =  process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`)
})