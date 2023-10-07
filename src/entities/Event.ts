import { Location } from "./Location";
import { Price } from "./Price";
import { User } from "./User";

/* The `Event` class represents an event with various properties such as title, location, date,
description, banner, coupons, participants, price, and city. */
class Event {
    constructor(
/* The code you provided is defining the constructor parameters for the `Event` class. Each parameter
is defined with a specific type and a public access modifier. */
        public tittle: string, 
        public location: Location,
        public date: Date,
        public description: string,
        public banner: string,
        public flyers: string[],
        public cupons: string[],
        public participantes: User[],
        public price: Price[],
        public city: string,



        
        ) {

    }
}
export {Event}