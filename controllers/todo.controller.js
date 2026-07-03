import Todo from "../models/todo.model.js";
import mongoose from "mongoose";
import { asyncHandler } from "../middlewares/asyncHandler.js";

// //create TODO - POST API
// export const createTodo = async (req, res) => {
//     try {
//         const { title, description } = req.body;

//         //Validation
//         if (!title || title.trim() === "") {
//             return res.status(400).json({
//                 success: false,
//                 message: "Title is required"
//             })
//         }

//         const todo = await Todo.create({
//             title,
//             description
//         })

//         return res.status(201).json({
//             success: true,
//             message: "Todo created successfully",
//             todo,
//         })

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: error.message,
//         })
//     }
// }

// //GET ALL TODO  - GET API
// export const getTodos = async (req, res) => {
//     try {
//         //Query Param
//         const { search, sort, page = 1, limit = 10 } = req.query;

//         //Base Query
//         let query = {};

//         //Search by TItle
//         if (search) {
//             query.title = { $regex: search, $options: "i" }
//         }

//         //Sorting
//         let sortOptions = {};
//         if (sort === "asc") {
//             sortOptions.createdAt = 1 // 1 for ascending order
//         } else {
//             sortOptions.createdAt = -1 // -1 for descending order - default
//         }

//         // Pagination
//         const skip = (page - 1) * limit;

//         const todos = await Todo.find(query)
//             .sort(sortOptions)
//             .skip(skip)
//             .limit(parseInt(limit));

//         const totalTodos = await Todo.countDocuments(query);

//         return res.status(200).json({
//             success: true,
//             message: "Todos fetch successfully",
//             total: totalTodos,
//             page: Number(page),
//             limit: Number(limit),
//             data: todos,
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: error.message,
//         })
//     }
// }

// // Get TODO by ID - GET API 
// export const getTodoById = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Validate ID based on mongoose 
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid Todo ID",
//             })
//         }

//         const todo = await Todo.findById(id);

//         // If Todo Not Found 
//         if (!todo) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Todo Not Found",
//             })
//         }

//         // If Todo Found 
//         return res.status(200).json({
//             success: true,
//             message: "Todo fetched successfully",
//             data: todo
//         })

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: error.message,
//         })
//     }
// }

// // Update Todo by ID - PUT API 
// export const updateTodo = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { title, description } = req.body;

//         // Validate based on ID 
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid Todo ID",
//             })
//         }

//         // Valid Input 
//         if(!title || title.trim() === ""){
//             return res.status(400).json({
//                 success: false,
//                 message: "Title is required."
//             })
//         }

//         // Update todo 
//         const todo = await Todo.findByIdAndUpdate(
//             id,
//             {title, description},
//             {new: true, runValidators: true}
//         );

//         //If todo Not Found
//             if(!todo){
//             return res.status(404).json({
//                 success: false,
//                 message: "Todo not Found"
//             })
//         }

//         // If Todo found and updated
//         return res.status(200).json({
//             success: true,
//             message: "Todo updated successfully",
//             data: todo,
//         })

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: error.message,
//         })
//     }
// }

// //Toggle Todo by ID - PATCH API
// export const toggleTodo = async (req, res) => {
//     try {
//         const {id} = req.params;

//          // Validate based on ID 
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid Todo ID",
//             })
//         }

//         // GET current Todo 
//         const todo = await Todo.findById(id);

//         //If todo Not Found
//             if(!todo){
//             return res.status(404).json({
//                 success: false,
//                 message: "Todo not Found"
//             })
//         }

//         // Flip isCompleted field 
//         todo.isCompleted = !todo.isCompleted;
        
//         await todo.save();

//         // If Todo found and updated
//         return res.status(200).json({
//             success: true,
//             message: "Todo updated successfully",
//             data: todo,
//         })

        
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: error.message,
//         })
//     }
// }

// // Delete Todo by ID
// export const deleteTodo = async (req, res) => {
//     try {
//          const {id} = req.params;

//          // Validate based on ID 
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid Todo ID",
//             })
//         }

//         // Delete Todo 
//         const todo = await Todo.findByIdAndDelete(id)

//         //If todo Not Found
//             if(!todo){
//             return res.status(404).json({
//                 success: false,
//                 message: "Todo not Found"
//             })
//         }



//         // If Todo found and deleted
//         return res.status(200).json({
//             success: true,
//             message: "Todo deleted successfully",
//             data: todo,
//         })

        
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: error.message,
//         })
//     }
// }






//create TODO - POST API
export const createTodo = asyncHandler(async (req, res) => {
        const { title, description } = req.body;

        //Validation
        if (!title || title.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            })
        }

        const todo = await Todo.create({
            title,
            description
        })

        return res.status(201).json({
            success: true,
            message: "Todo created successfully",
            todo,
        })
})

//GET ALL TODO  - GET API
export const getTodos = asyncHandler(async (req, res) => {
        //Query Param
        const { search, sort, page = 1, limit = 10 } = req.query;

        //Base Query
        let query = {};

        //Search by TItle
        if (search) {
            query.title = { $regex: search, $options: "i" }
        }

        //Sorting
        let sortOptions = {};
        if (sort === "asc") {
            sortOptions.createdAt = 1 // 1 for ascending order
        } else {
            sortOptions.createdAt = -1 // -1 for descending order - default
        }

        // Pagination
        const skip = (page - 1) * limit;

        const todos = await Todo.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        const totalTodos = await Todo.countDocuments(query);

        return res.status(200).json({
            success: true,
            message: "Todos fetch successfully",
            total: totalTodos,
            page: Number(page),
            limit: Number(limit),
            data: todos,
        })
})

// Get TODO by ID - GET API 
export const getTodoById = asyncHandler(async (req, res) => {
        const { id } = req.params;

        // Validate ID based on mongoose 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID",
            })
        }

        const todo = await Todo.findById(id);

        // If Todo Not Found 
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo Not Found",
            })
        }

        // If Todo Found 
        return res.status(200).json({
            success: true,
            message: "Todo fetched successfully",
            data: todo
        })
})

// Update Todo by ID - PUT API 
export const updateTodo = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { title, description } = req.body;

        // Validate based on ID 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID",
            })
        }

        // Valid Input 
        if(!title || title.trim() === ""){
            return res.status(400).json({
                success: false,
                message: "Title is required."
            })
        }

        // Update todo 
        const todo = await Todo.findByIdAndUpdate(
            id,
            {title, description},
            {new: true, runValidators: true}
        );

        //If todo Not Found
            if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not Found"
            })
        }

        // If Todo found and updated
        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: todo,
        })
})

//Toggle Todo by ID - PATCH API
export const toggleTodo = asyncHandler(async (req, res) => {
        const {id} = req.params;

         // Validate based on ID 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID",
            })
        }

        // GET current Todo 
        const todo = await Todo.findById(id);

        //If todo Not Found
            if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not Found"
            })
        }

        // Flip isCompleted field 
        todo.isCompleted = !todo.isCompleted;
        
        await todo.save();

        // If Todo found and updated
        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: todo,
        })
})

// Delete Todo by ID
export const deleteTodo = asyncHandler(async (req, res) => {
         const {id} = req.params;

         // Validate based on ID 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID",
            })
        }

        // Delete Todo 
        const todo = await Todo.findByIdAndDelete(id)

        //If todo Not Found
            if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not Found"
            })
        }



        // If Todo found and deleted
        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
            data: todo,
        })
});