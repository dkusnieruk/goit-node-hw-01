const { log } = require("console");

const fs = require(`fs`).promises;
const contactsPath = "./db/contacts.json";

const getContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  console.table(JSON.parse(data));
  return JSON.parse(data);
};

const getContactsById = async (contactID) => {
  const data = await getContacts();

  data.find((single) => {
    if (single.id.includes(contactID)) {
      console.table(single);
      return single;
    } else {
      return false;
    }
  });
};

const removeContact = async (contactID) => {
  const data = await getContacts();
  const newList = data.findIndex((contact) => contact.id == contactID);
  data.splice(newList, 1);
  console.table(data);

  fs.writeFile(contactsPath, JSON.stringify(data));
  return newList;
};

const addContact = async (name, email, phone) => {
  const data = await getContacts();
  const newContact = {
    id: `${data.length + 1}`,
    name: name,
    email: email,
    phone: phone,
  };
  data.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(data));
  console.table(data);
};

module.exports = {
  listContacts,
  getContactsById,
  removeContact,
  addContact,
};
