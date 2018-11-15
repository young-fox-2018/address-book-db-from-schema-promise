const Model = require('./Model')
const db = require('../Database/db')

class Contact extends Model {
    static addContact(newContact) {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO contacts (name,company,phone,email)
                VALUES ('${newContact.name}','${newContact.company}',${newContact.phone},'${newContact.email}')`
            db.run(query, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(null)
                }
            })

        })

    }


}
module.exports = Contact