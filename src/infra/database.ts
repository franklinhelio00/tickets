import mongoose from "mongoose";

export async function connect(){
    try {
/* The code `await
mongoose.connect('mongodb+srv://franklinhelio00:159753MongooseDb@ticketdb.nu3v3po.mongodb.net/hero-tickets');`
is connecting to a MongoDB database using the Mongoose library. It is using the `connect` method of
the `mongoose` object to establish a connection to the specified MongoDB database URL. */
        await mongoose.connect('CAMINHO DO MONGO');
        console.log('connect database success');
        
    } catch (error) {
        console.log('error: ', error);
    }
}