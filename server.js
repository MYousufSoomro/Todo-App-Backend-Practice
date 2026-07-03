import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middlewares/error.middleware.js';

dotenv.config();
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//CONNECT TO DATABASE
connectDB();

//Test Route
// app.get("/", (req,res) => {
//     res.send("Todo API is running...")
// });

//ROUTES
app.use('/api/todos', todoRoutes);

//Error Handling Middleware
app.use(errorHandler);

//Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is Running on http://localhost:${PORT}`);
});