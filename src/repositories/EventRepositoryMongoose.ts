/* The EventRepositoryMongoose class is responsible for adding events to the database using Mongoose. */
import mongoose from "mongoose"
import { Event } from "../entities/Event";
import { EventRepository } from "./EventRepository";

/* The `eventSchema` variable is creating a schema for events using Mongoose. It defines the structure
and data types for each field in an event document. */
const eventSchema = new mongoose.Schema({
    tittle: String,
    location: {
        latitude: String,
        longitude: String
    },
    date: Date,
    createdAt:{
        type:Date,
        default: Date.now
    },
    description: String,
    categorias: [String],
    banner: String,
    flyers: [String],
    price: {
        type: Array,  
    },
    city: String,
    participantes: {
        type : Array,
        ref: 'User'
    }
});


const EventModel = mongoose.model('Event', eventSchema);

class EventRepositoryMongoose implements EventRepository{
    async add(event: Event): Promise<Event>{
        const eventModel = new EventModel(event)
        await eventModel.save();
        return event;
    }


}

export {EventRepositoryMongoose}