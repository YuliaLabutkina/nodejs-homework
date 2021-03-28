const { contacts } = require('./data')

const getContacts = jest.fn((userId, {sortBy, sortByDesc, filter, limit = "5", offset = "0"}) => {
 return { total: contacts.length, limit, offset, contacts }
})

const getContactById = jest.fn((id, userId) => {
    const [ contact ] = contacts.filter(el => String(el._id) === String(id))
    return contact
})

const removeContact = jest.fn((id, userId) => {
    const index = contacts.findIndex(el => String(el._id) === String(id))
    if(index === -1) {
        return null
    }
    const [ contact ] = contacts.splice(index, 1)
    return contact
})

const addContact = jest.fn((body) => {
    const newContact = {...body, _id: '604dea100c3cdb1fccbe8337'}
    contacts.push(body)
    return newContact
})
const updateContact = jest.fn((id, body, userId) => {
    const [ contact ] = contacts.filter(el => String(el._id) === String(id))
    if(contact) {
        return { ...contact, ...body }
    }
})

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
