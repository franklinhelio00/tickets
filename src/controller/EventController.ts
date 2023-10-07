/* The EventController class is responsible for handling requests related to events and delegating the
logic to the EventUseCase class. */
import { NextFunction, Request, Response } from "express";
import { EventUseCase } from "../useCases/EventUseCase";

class EventController{
    constructor(private eventUseCase: EventUseCase){}

/**
 * The `create` function is an asynchronous function that handles the creation of an event by calling
 * the `create` method of the `eventUseCase` and returns a success message if the event is created
 * successfully.
 * @param {Request} request - The `request` parameter represents the incoming HTTP request from the
 * client. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} response - The `response` parameter is an object that represents the HTTP response
 * that will be sent back to the client. It is used to set the status code and send the response body.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically used to handle errors or to
 * move on to the next middleware function in the chain.
 * @returns a JSON response with a status code of 201 and a message indicating that the event was
 * created successfully.
 */
    async create(request: Request, response: Response, next: NextFunction){
        const eventData = request.body
        try {
          await this.eventUseCase.create(eventData)
          return response.status(201).json({message: 'Evento criado com sucesso'})
        } catch (error) {
            next(error);
            
        }

    }
}

export {EventController}