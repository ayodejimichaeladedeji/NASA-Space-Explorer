function errorHandler(error, req, res, next){
    const type = error.type;
    const status = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    const errorMessage = error.errorMessage || 'An error occurred';

    console.error(`${type}: ${status} > ${message}`);

    res.status(status).json({
        success: false,
        message: message,
        errorMessage: errorMessage
    });
}

export default errorHandler;