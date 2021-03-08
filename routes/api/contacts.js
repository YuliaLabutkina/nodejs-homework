const express = require('express')
const router = express.Router()
const { getAllContacts, getOneContactById, createNewContact, deleteContact, updateOneContact } = require('../../controllers/controllersContacts')
const validate = require('../../validation')

router.get('/', getAllContacts)

router.get('/:contactId', getOneContactById)

router.post('/', validate.createContact, createNewContact)

router.delete('/:contactId', deleteContact)

router.patch('/:contactId', validate.updateContact, updateOneContact)

module.exports = router
