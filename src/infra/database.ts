
import mongoose from "mongoose";

export async function connect(){
    try {
        await mongoose.connect('CAMINHO DO BANCO');
        console.log('connect database success');
        
    } catch (error) {
        console.log('error: ', error);
    }
}