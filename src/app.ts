import express, { Application } from 'express';
import { connect } from './infra/database';
import { errorMiddleware } from './middlewares/error.middlewares';
import { eventRoutes } from './routes/event.routes';

/* The `App` class is a class that represents the Express application. It has a constructor that
initializes the application by setting up middleware, initializing routes, handling errors, and
connecting to the database. */
class App{
    public app: Application;
    private EventRoutes = new eventRoutes();
/**
 * This constructor function initializes an Express app, sets up middleware, initializes routes,
 * handles errors, and connects to a database.
 */
    constructor(){
        this.app = express();
        this.middlewaresInitialize();
        this.initializeRoutes();
        this.interceptionErros();
        connect();

    }
    
    initializeRoutes(){
        /* `this.app.use('/events', this.EventRoutes.router);` is setting up a middleware in the
        Express application to handle requests with the path '/events'. It uses the router defined
        in the `eventRoutes` class (`this.EventRoutes.router`) to handle the requests. This means
        that any request with the path '/events' will be intercepted by the `eventRoutes` router and
        the corresponding route handler will be executed. */
        this.app.use('/events', this.EventRoutes.router);
    }

    interceptionErros(){
        /* `this.app.use(errorMiddleware)` is setting up a middleware in the Express application to
        handle errors. The `errorMiddleware` function is defined in the
        `middlewares/error.middlewares` file. */
        this.app.use(errorMiddleware)
    }

    middlewaresInitialize(){
        /* `this.app.use(express.json());` is setting up the middleware to parse incoming requests with
        JSON payloads. It allows the application to handle JSON data sent in the request body. */
        this.app.use(express.json());
        /* `this.app.use(express.urlencoded({extended: true}));` is setting up the middleware to parse
        incoming requests with URL-encoded payloads. It allows the application to handle data sent
        in the request body using URL-encoded format. The `extended: true` option allows for parsing
        of nested objects in the URL-encoded data. */
        this.app.use(express.urlencoded({extended: true}));

    }
    listen() {
        this.app.listen(3333,()=> console.log('Server is runing'))
    }
}

export {App};