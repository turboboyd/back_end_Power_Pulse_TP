// import httpError from "./HttpError.js";

// const validateBody = schema => {
//     const func = (req, res, next) => {
//         const { error } = schema.validate(req.body);
//         if (error) {
//             return next(httpError(400, error.message));
//         }
//         next()
//     }

//     return func;
// }

// export default validateBody;

import httpError from "./HttpError.js";

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    try {
      const validatedData = await schema.validateAsync(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      return next(httpError(400, error.message));
    }
  };

  return func;
};

export default validateBody;
