/* The EventRepositoryMongoose class is responsible for adding events to the database using Mongoose. */
import mongoose from "mongoose"
import { Event } from "../entities/Event";
import { EventRepository } from "./EventRepository";
import { Location } from "../entities/Location";

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

    async findByLocationAndDate(location: Location, date: Date): Promise<Event | undefined>{
        const findEvent = await EventModel.findOne({location, date}).exec()
        return findEvent ? findEvent.toObject() : undefined;
    }
    async findEventsByCity(city: string): Promise<Event[]> {
        const findEvent = await EventModel.find({city}).exec()

        return findEvent.map((event) => event.toObject());        
    }    
    async findEventByCategory(categorias: string): Promise<Event[]> {
        const findEvent = await EventModel.find({categorias}).exec()

        return findEvent.map((event) => event.toObject());        
    }


}

export {EventRepositoryMongoose}