const errorHandler = (err, req, res, next) => {
    let status = 500
    let message = "Internal Server Error"

    switch (err.name) {
        case "SequelizeValidationError" :
             status = 400
             message = {
                errors : err.errors.map(el => el.message)
            }
            break;

        case "SequelizeUniqueConstraintError" :
            status = 400
            message = {
                errors : err.errors.map(el => el.message)
            }
            break;

        case "Invalid Login" :
            status = 401
            message = "Invalid email/password"
            break;

        case "Not Found" :
            status = 404
            message = "Data Not Found"
            break;  

        case "Data Exist" :
            status = 401
            message = "Lodging Already Exist"
            break;

        case "unauthenticated":
        case "JsonWebTokenError":
            status = 401;
            message = "Invalid Token";
            break;

        case "Forbidden" :
            status = 403
            message = "You aren't allow access this point"

        default:
            break;
    }
    res.status(status).json({message})
}

module.exports = errorHandler