const fs = require(`fs`).promises;
const contactsPath = "./db/contacts.json";

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
};

const getContactsById = async (contactID) => {
  const data = await listContacts();

  data.filter((single) => {
    if (single.id.includes(contactID)) {
      return single;
    } else {
      return false;
    }
  });
};

const removeContact = async (contactID) => {
  const data = await listContacts();
  const newList = data.filter((contact) => contact.id != contactID);
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const newContact = {
    id: `${data.length + 1}`,
    name: name,
    email: email,
    phone: phone,
  };
  data.push(newContact);
};

module.exports = {
  listContacts,
  getContactsById,
  removeContact,
  addContact,
};
