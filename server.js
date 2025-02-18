import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'
import connectDb from './config/dbConfig.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js'
import testPapersRoutes from './routes/testPapersRoutes.js'


dotenv.config();

connectDb();

const app = express()

app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/adminAuth',adminAuthRoutes)
app.use('/api/test',testPapersRoutes)

app.get('/', (req, res)=> {
  res.send('Hello World')
})
const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`)
})