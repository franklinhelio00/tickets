
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const db = process.env.MONGODB_URI;

export async function connect(){
    try {
        await mongoose.connect(`${db}`);
        console.log('connect database success');
        
    } catch (error) {
        console.log("🚀 ~ file: database.ts:10 ~ connect ~ error:", error)
        
    }
}