import mongoose from "mongoose";
export const connectDb=async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_DB_URL)
        console.log(`Connected to mongoDb ${conn.connection.host}`)
    
    }catch(error){
       console.log(error)
       process.exit(1);
    }
}
export default connectDb;