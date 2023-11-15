import httpError from "./HttpError.js";

const validateBodyAuth = schema => {
    const func = async (req, res, next) => {
        if (req.method === 'PUT' || 'POST' && req.baseUrl === '/api/profileSettings') {
            const { error } = schema.validate(req.body.profileSettings);
            if (error) {
                return next(httpError(400, error.message));
            }
        } else {
            const { error } = schema.validate(req.body);
            if (error) {
                return next(httpError(400, error.message));
            }
        }
        next()
    }
    return func;
}

export default validateBodyAuth;