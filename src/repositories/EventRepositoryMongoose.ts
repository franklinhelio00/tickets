import mongoose from "mongoose"
import { EventRepository } from "./EventRepository";

const eventSchema = new mongoose.Schema({
    tittle: String,
    location: {
        latitude: String,
        longitude: String,
    },
    date: Date,
    createdAt:{
        type: Date,
        default: Date.now,
    },
    description: String,
    categories: [String],
    banner: String,
    flyers: [String],
    price: {
        type : Array,
    },
    city: String,
    participantes: {
        type: Array,
        ref: 'User'

    }
});

const EventModel = mongoose.model('Event', eventSchema);

class EventRepositoryMongoose implements EventRepository{
    async add(event: Event): Promise<Event> {
        const eventModel = new EventModel(event)

        await eventModel.save();
        return event;
    }
}

export {EventRepositoryMongoose};