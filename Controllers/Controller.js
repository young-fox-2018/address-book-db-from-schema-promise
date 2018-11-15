const Contact = require('../Models/contact')
const Group = require('../Models/group')
const ContactGroup = require('../Models/contact-group')
const View = require('../Views/')


class Controller {
    static addContact(table, data) {
        let newContact = {
            name: data[0],
            company: data[1],
            phone: data[2],
            email: data[3]
        }
        Contact.findOne(table, 'email', newContact.email)
            .then(data => {
                if (data) {
                    View.showData(`Data sudah ada didatabase!`)
                } else {
                    Contact.addContact(newContact)
                }
            })


    }

}

module.exports = Controller