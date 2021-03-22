const { Schema, model, SchemaTypes } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name'],
    },
    email: {
        type: String,
        required: [true, 'Set email'],
    },
    phone: {
        type: String,
        min: 9,
        max: 17,
        required: [true, 'Set phone'], 
    },
    subscription: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    token: {
        type: String,
        required: false,
    },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
    },
},
{ versionKey: false})

contactSchema.plugin(mongoosePaginate)
const Contact = model('contact', contactSchema)

module.exports = Contact