const Contact = require('./schemas/contact')

async function getContacts() {
  try {
    const result = await Contact.find({})
    return result
  } catch (err) {
    console.log(err)
  }
}

async function getContactById(contactId) {
  try {
    const result = await Contact.find({ _id: contactId})
    return result
  } catch (err) {
    console.log(err)
  }
}

async function removeContact(contactId) {
  try {
    const result = await Contact.findByIdAndRemove(contactId)
    return result
  } catch (err) {
    console.log(err)
  }
}

async function addContact(body) {
  try {
    const result = await Contact.create(body)
    return result
  } catch (err) {
    console.log(err)
  }
}

async function updateContact(contactId, body) {
  try {
    const result = await Contact.findOneAndUpdate(
      { _id: contactId },
      { ...body },
      {new: true},
    )
    return result
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
