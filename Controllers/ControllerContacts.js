const Contacts = require('../Models/Contact')
const View = require('../Views/View')
const Model = require('../Models/Model')

class ControllerContacts {

    static create (option) {
        Contacts.create({
            name: option[1],
            company: option[2],
            phone: option[3],
            email: option[4]
        })
            .then((data) => {
                View.successCreate(option[1])
            })
            .catch((err) => {
                View.errDisplay(err)
            })
    }

    static readOne (option) {
        Contacts.findOne({
            table: option[0],
            field: 'name',
            value: option[1]
        })
            .then((data) => {
                if(!data) {
                    throw `data tidak di temukan`
                } else {
                    View.displayData(data)
                }
            })
            .catch((err) => {
                View.errDisplay
            })
    }

}

module.exports = ControllerContacts