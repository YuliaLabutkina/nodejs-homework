const Joi = require('joi')

const schemaValidationUser = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'gmail'] } }).required(),
    password: Joi.string().min(6).max(17).required(),
  })

const validate = (schema, obj, next) => {
    const { error } = schema.validate(obj)
    if (error) {
      const [{ message }] = error.details
      return next({
        status: 400,
        message,
      })
    }
    next()
  }
  
  module.exports.validationUser = (req, res, next) => {
    return validate(schemaValidationUser, req.body, next)
  }