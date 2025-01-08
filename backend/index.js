import dotenv from "dotenv";
import connectDB from "./config/db.connection.js";
import { app } from "./app.js";

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    console.log('Database connected');
    app.listen(process.env.PORT||5000,()=>{
        console.log('the hospital manegment app is listning at port',process.env.PORT);
        
    })
    
})