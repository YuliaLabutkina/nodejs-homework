const Contact = require('./schemas/contact')

async function getContacts(userId, {sortBy, sortByDesc, filter, limit = "5", offset = "0"}) {
  try {
    const result = await Contact.paginate(
      {owner: userId},
      {
        limit,
        page: offset,
        sort: { 
          ...(sortBy ? {[`${sortBy}`]: 1} : {}),  //name: 1 --- if sortBy = name
          ...(sortByDesc ? {[`${sortByDesc}`]: -1} : {}), //name: -1
        },
        select: filter ? filter.split('|').join(' ') : '',
        populate: {
          path: 'owner',
          select: 'name email subscription',
        }
      }
      )
    const { docs: contacts, totalDocs: total } = result
    return { total: total.toString(), limit, offset, contacts }
  } catch (err) {
    console.log(err)
  }
}

async function getContactById(contactId, userId) {
  try {
    const result = await Contact.find({ _id: contactId, owner: userId}).populate({
      path: 'owner',
      select: 'name email subscription',
    })
    return result
  } catch (err) {
    console.log(err)
  }
}

async function removeContact(contactId, userId) {
  try {
    const result = await Contact.findByIdAndRemove({contactId, owner: userId})
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

async function updateContact(contactId, body, userId) {
  try {
    const result = await Contact.findByIdAndUpdate(
      { _id: contactId, owner: userId },
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
