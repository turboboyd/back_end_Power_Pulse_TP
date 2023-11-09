import { isValidObjectId } from "mongoose";
import httpError from '../helpers/httpError.js';

const idValidation = (req,res,next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return next(httpError(400, `Not valid id`));
    }

    next();

}

export default idValidation;