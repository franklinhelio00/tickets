/* The `HttpException` class is a custom error class in TypeScript that represents an HTTP exception
with a status code and a message. */
class HttpException extends Error{
/* The code snippet is defining a class called `HttpException` in TypeScript. */
    public status: number;
    public message: string;
    constructor(status: number, message: string){
        super(message);
        this.status = status
        this.message = message
    }
}

export {HttpException}