import { NextFunction, Request, Response } from "express";
import { HttpException } from "../interfaces/HttpExceptions";

/**
 * The errorMiddleware function handles HTTP exceptions by setting the status and message properties of
 * the error response.
 * @param {HttpException} err - The `err` parameter is an instance of the `HttpException` class, which
 * represents an HTTP exception that occurred during the processing of a request. It contains
 * information about the error, such as the status code and error message.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request method, URL, headers, and body.
 * @param {Response} res - The `res` parameter is the response object in Express.js. It represents the
 * HTTP response that will be sent back to the client. It is used to send the response data, set
 * response headers, and control the response status code.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically used to handle errors or to
 * move on to the next middleware function.
 */
export function errorMiddleware(err: HttpException, req: Request, res: Response, next: NextFunction){
    const status: number = err.status ?? 500;
    const message: string = err.message ?? 'Internal server error';

    res.status(status).json({
        status,
        message,
    });

}