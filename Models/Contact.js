const Model = require('./Model')

class Contact extends Model {
    static create(input) {
        Contact.create(input, 'contact')
    }
}

module.exports = Contact