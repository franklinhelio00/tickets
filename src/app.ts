import express, { Application } from 'express';
import { connect } from './infra/database';
import { errorMiddleware } from './middlewares/error.middlewares';

class App{
    public app: Application;
    constructor(){
        this.app = express();
        this.middlewaresInitialize();
        this.initializeRoutes();
        this.interceptionErros();
        connect();

    }
    initializeRoutes(){
        // this.app.use('/', 'events')
    }

    interceptionErros(){
        this.app.use(errorMiddleware)
    }

    middlewaresInitialize(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

    }
    listen() {
        this.app.listen(3333,()=> console.log('Server is runing'))
    }
}

export {App};