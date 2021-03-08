const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema({
    name: { type: String, required: [true, 'Set name'] },
    email: { type: String, required: [true, 'Set email'] },
    phone: { type: String, min: 9, max: 17, required: [true, 'Set phone'] },
    subscription: { type: String, required: false },
    password: { type: String, required: false },
    token: { type: String, required: false },
},
{ versionKey: false})

const Contact = model('contact', contactSchema)

module.exports = Contact