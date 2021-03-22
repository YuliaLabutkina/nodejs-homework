const express = require('express')
const router = express.Router()
const { getAllContacts, getOneContactById, createNewContact, deleteContact, updateOneContact } = require('../../../controllers/controllersContacts')
const validate = require('./validation')
const guard = require('../../../helpers/guard')

router.get('/', guard, getAllContacts)
router.get('/:contactId', guard, getOneContactById)
router.post('/', guard, validate.createContact, createNewContact)
router.delete('/:contactId', guard,  deleteContact)
router.patch('/:contactId', guard, validate.updateContact, updateOneContact)

module.exports = router
