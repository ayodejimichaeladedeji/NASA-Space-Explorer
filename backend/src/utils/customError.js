class CustomError extends Error{
    constructor(type, message, statusCode=500, errorMessage){
        super(message);
        this.type = type;
        this.message = message;
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
    }
}

export default CustomError;