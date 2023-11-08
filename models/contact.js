const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");
const emailRegex = /^[0-9+()\\-]*$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const addSchemaErrorMessages = {
  "any.required": "missing required {{#label}} field",
  "string.email": "invalid {{#label}} format",
  "string.pattern.base":
    "invalid {{#label}} format.{{#label}} format must: +380000000000 ",
  "object.min": "missing fields",
};

const addSchema = Joi.object()
  .when(Joi.object().min(1), {
    then: Joi.object({
      name: Joi.string().required().label("Name"),
      email: Joi.string().email().required().label("Email"),
      phone: Joi.string().pattern(emailRegex).required().label("Phone"),
      favorite: Joi.boolean(),
    }),
  })
  .min(1)
  .messages(addSchemaErrorMessages);

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
  }),
});

const schemas = {
  addSchema,
  updateStatusContactSchema,
};

module.exports = {
  Contact,
  schemas,
};
