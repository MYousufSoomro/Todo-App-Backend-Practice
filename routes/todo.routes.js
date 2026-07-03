import express from 'express';
import { createTodo, getTodos, getTodoById, updateTodo, toggleTodo, deleteTodo } from '../controllers/todo.controller.js';

const route = express.Router();

// route.get("/", (req,res)=>{
//      res.send("Todo API is running...")
// });


// create todo
route.post('/add', createTodo);

// Get Todos
route.get("/", getTodos);

// Get Todo by ID 
route.get("/:id", getTodoById);
 
// Update Todo by ID 
route.put("/:id", updateTodo);

//Toggle Todo completion status by ID
route.patch("/:id/toggle", toggleTodo);

//Delete Todo by ID
route.delete("/:id", deleteTodo);

export default route;
