const { log } = require("console");
const fs = require(`fs`).promises;
const contactsPath = "./db/contacts.json"

    const listContacts = async() => {
    const data = await fs.readFile(contactsPath)
    // console.log(JSON.parse(data));
    return JSON.parse(data)
}    

    const getContactsById = async (contactID) =>{
        const data =await listContacts();
        
        data.filter(single =>{
            if(single.id.includes(contactID)){
                console.log(single);
                return single
            }
            else 
            {
                return false}
        })
        }
    
    const removeContact = async (contactID) =>{
        const data = await listContacts();        
        const newList = data.filter(
            contact => contact.id != contactID
        )
        console.log(newList);
    }    

    const addContact = async (name, email , phone) =>{
        const data = await listContacts();
        const newContact = {id:`${data.length+1}`, name:name, email:email, phone:phone}
        data.push(newContact);
        console.log(data);
    }


module.exports ={
    listContacts,
    getContactsById,
    removeContact,
    addContact,
}
