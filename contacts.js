const fs = require(`fs`).promises;
const contactsPath = "./db/contacts.json";

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  console.table(JSON.parse(data));
  return JSON.parse(data);
};

const getContactsById = async (contactID) => {
  const data = await listContacts();

  data.filter((single) => {
    if (single.id.includes(contactID)) {
      console.table(single);
      return single;
    } else {
      return false;
    }
  });
};

const removeContact = async (contactID) => {
  const data = await listContacts();
  const newList = data.filter((contact) => contact.id != contactID);
  fs.writeFile(contactsPath, JSON.stringify(newList))
  console.table(newList);
  return newList;
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
  fs.writeFile(contactsPath, JSON.stringify(data))
  console.table(data);
};

module.exports = {
  listContacts,
  getContactsById,
  removeContact,
  addContact,
};
