import ctrlWrapper from "./ctrlWrapper.js";
import httpError from "./HttpError.js";

const bmrCalculation = async (req,res,next) => {

    const activityCoefficients = { 1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9 };
    const { height, currentWeight, birthday, sex, levelActivity } = req.body;
    const today = new Date().getFullYear();
    const userBDay = new Date(birthday).getFullYear();
    const age = today - userBDay;
    let bmr;

    if (sex === 'male') {
        bmr =  Math.round((10 * currentWeight + 6.25 * height - 5 * age + 5) * activityCoefficients[levelActivity]);
    }
    
    else if (sex === 'female') {
        bmr = Math.round((10 * currentWeight + 6.25 * height - 5 * age - 161) * activityCoefficients[levelActivity]);
    }
    
    else {
        throw httpError(400, 'Invalid gender')
    }

    req.body = {...req.body, bmr}
    next()
}

export default ctrlWrapper(bmrCalculation);