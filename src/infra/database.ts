
import mongoose from "mongoose";

export async function connect(){
    try {
        await mongoose.connect('');
        console.log('connect database success');
        
    } catch (error) {
        console.log("🚀 ~ file: database.ts:10 ~ connect ~ error:", error)
        
    }
}