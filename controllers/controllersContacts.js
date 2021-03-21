const { getContacts, getContactById, removeContact, addContact, updateContact } = require('../model/contacts')

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id
    const allContacts = await getContacts(userId, req.query)
    return res.json({
      status: 'success',
      code: 200,
      data: {
        ...allContacts
      },
    })
  } catch (err) {
    next(err)
  }
}

const getOneContactById = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await getContactById(req.params.contactId, userId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      })
    }
  } catch (err) {
    next(err)
  }
}

const createNewContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const {name, email, phone } = req.body
    await addContact({ ...req.body, owner: userId})
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        name,
        email,
        phone
      },
    })
  } catch (err) {
    next(err)
  }
}

const deleteContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const id = await removeContact(req.params.contactId, userId)
    if (id) {
      res.status(200).json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      })
    }
  } catch (err) {
    next(err)
  }
}

const updateOneContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    if (req.body) {
      const contact = await updateContact(req.params.contactId, req.body, userId)
      if (contact) {
        res.status(200).json({
          status: 'success',
          code: 200,
          data: {
            contact
          },
        })
      } else {
        return res.status(404).json({
          status: 'error',
          code: 404,
          data: 'Not found',
        })
      }
    } else {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing fields',
      })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAllContacts,
  getOneContactById,
  createNewContact,
  deleteContact,
  updateOneContact,
}