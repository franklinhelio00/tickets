/* The code is defining an interface called `EventRepository` and exporting it. */
import { Event } from "../entities/Event";

/* The code is defining an interface called `EventRepository`. This interface has one method called
`add` which takes an argument of type `Event` and returns a `Promise` of type `Event`. This
interface is used to define the contract for a class or object that will implement the `add` method. */
interface EventRepository {
    add(event: Event): Promise<Event>;
}

export {EventRepository}