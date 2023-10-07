/* The eventRoutes class sets up the routes for handling events in an Express application. */
import { Router } from "express"
import { EventRepositoryMongoose } from "../repositories/EventRepositoryMongoose";
import { EventController } from "../controller/EventController";
import { EventUseCase } from "../useCases/EventUseCase";
import { upload } from "../infra/multer";

/* The `eventRoutes` class is responsible for setting up the routes for handling events in an Express
application. */
class eventRoutes{
    public router:Router;
    private eventController: EventController;
    constructor(){
/* The code is initializing the router, creating instances of the EventRepositoryMongoose,
EventUseCase, and EventController classes, and then calling the initRoutes() method. */
        this.router = Router();
        const eventRepository = new EventRepositoryMongoose();
        const eventUseCase = new EventUseCase(eventRepository);
        this.eventController = new EventController(eventUseCase);
        this.initRoutes();

    }

/**
 * The function initializes routes for a POST request to create an event.
 */
    initRoutes(){
        /* `this.router.post('/', this.eventController.create.bind(this.eventController));` is setting
        up a route for handling a POST request to create an event. */
        this.router.post('/', 
        upload.fields([
            {
            name: 'banner',
            maxCount: 1
            },
            {
                name: 'flyers',
                maxCount: 3
            },
    
    
    ]),
        this.eventController.create.bind(this.eventController));
    }
}

export {eventRoutes}