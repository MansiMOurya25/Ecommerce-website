import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cors from 'cors'
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoute.js'


dotenv.config();
const app = express()
//mongodb connextion
connectDB();



//middlware
app.use(cors());
app.use(express.json())
//routes
app.use('/api/v1/auth' ,authRoutes )
app.use('/api/v1/category' ,categoryRoutes )
app.use('/api/v1/product' ,productRoutes )


//rest api
app.get('/' ,(req ,res)=>{
    res.send(
        "<h1>Ecommerce website</h1>"
    )
})
const PORT = process.env.PORT

app.listen(PORT ,()=>{
     console.log(`server runned on ${PORT}`)    
})