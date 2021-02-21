const { listContacts, getContactById, removeContact, addContact } = require('./contacts')
const argv = require('yargs').argv

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts().then(console.table)
      break

    case 'get':
      getContactById(id).then(console.log)
      break

    case 'add':
      addContact(name, email, phone)
      break

    case 'remove':
      removeContact(id)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)
