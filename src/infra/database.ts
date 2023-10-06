import mongoose from "mongoose";

export async function connect(){
    try {
        await mongoose.connect('mongodb+srv://franklinhelio00:159753MongooseDb@ticketdb.nu3v3po.mongodb.net/hero-tickets');
        console.log('connect database success');
        
    } catch (error) {
        console.log('error: ', error);
    }
}