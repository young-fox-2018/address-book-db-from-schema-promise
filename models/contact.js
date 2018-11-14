const Model = require('./model')
const fs = require('fs')
const dataContact = JSON.parse(fs.readFileSync('./database/contact.json'))

class Contact {
    static createTable() {
        return new Promise(function (resolve, reject) {
            let fields = `id INTEGER PRIMARY KEY AUTOINCREMENT,
                         name TEXT NOT NULL,
                         email TEXT NOT NULL,
                         phone TEXT NOT NULL,
                         company TEXT NOT NULL`
            Model.createTable('Contacts', fields)
                .then(function () {
                    resolve()
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    }
    static readDummyData() {
        return new Promise(function (resolve, reject) {
            for (let i = 0; i < dataContact.length; i++) {
                let dummyContact = `(null, "${dataContact[i].name}", "${dataContact[i].email}", "${dataContact[i].phone}","${dataContact[i].company}")`
                Model.create('Contacts', dummyContact)
                    .then(function () {
                        resolve()
                    })
                    .catch(function (err) {
                        reject(err)
                    })
            }
        })
    }

    static validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    static add(name, email, phone, company) {
        return new Promise(function (resolve, reject) {
            if (!Contact.validateEmail(email)) {
                reject(`Missing Character @ or . when input emaill`)
            } else if (phone.length < 12 || phone.length > 12) {
                reject(`Phone must be 12 character`)
            }
            else {
                Model.findOne('Contacts', 'email', `${email}`)
                    .then(function (data) {
                        if (data) {
                            reject(`Email already Exists!`)
                        } else {
                            let dataContact = `(null, "${name}", "${email}", "${phone}", "${company}")`
                            Model.create('Contacts', dataContact)
                                .then(function () {
                                    resolve()
                                })
                        }
                    })
                    .catch(function (err) {
                        reject(err)
                    })
            }

        })
    }
    static findOne(field, value) {
        return new Promise(function (resolve, reject) {
            Model.findOne('Contacts', field, value)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    }
    static update(field, newValue, fieldCondition, condition) {
        return new Promise(function (resolve, reject) {
            Model.update('Contacts', field, newValue, fieldCondition, condition)
                .then(function () {
                    resolve()
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    }
    static delete(fieldId, id) {
        return new Promise(function (resolve, reject) {
            Model.delete('Contacts', fieldId, id)
                .then(function () {
                    resolve()
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    }
}

module.exports = Contact