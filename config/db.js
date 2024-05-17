import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        // console.log(process.env.URI);
        const conn = await mongoose.connect(process.env.URI+'/mathongo');
        console.log(`server is conncted to DB host ${conn.connection.host}`);
    } catch (error) {
        console.log(error)
    }
} 

export default connectDB;

