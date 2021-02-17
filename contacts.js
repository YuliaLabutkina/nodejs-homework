const fsPromises = require("fs").promises;
const path = require('path')

const contactsPath = path.join(__dirname, './db/contacts.json');

async function readFiles(patch) {
    try {
        const file = await fsPromises.readFile(patch, 'utf-8');
        const list = JSON.parse(file)
        return list
    } catch (err) {
        console.log(err)
    }
}

async function writeFiles(patch, data) {
    try {
        await fsPromises.writeFile(patch, JSON.stringify(data), 'utf-8');
    } catch (err) {
        console.log(err)
    }
}

async function listContacts() {
    try {
        const contacts = await readFiles(contactsPath)
        return contacts
    } catch (err) {
        console.log(err)
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await readFiles(contactsPath)
        return contacts.filter(el => el.id === contactId)
    } catch (err) {
        console.log(err)
  }
}

async function removeContact(contactId) {
  try {
      const contacts = await readFiles(contactsPath)
      const data = contacts.filter(el => el.id !== contactId)
      await writeFiles(contactsPath, data)
  } catch (err) {
      console.log(err)
  }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await readFiles(contactsPath)
        const data = [...contacts, { id: 11, name, email, phone }]
        await writeFiles(contactsPath, data)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}