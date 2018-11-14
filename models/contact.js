const Model = require("./model")
const db = require("../database/connection")

class Contact extends Model {
    constructor(name, telp, email, company) {
        super()
        this.name = name
        this.telp = telp
        this.email = email
        this.company = company
    }
    static validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    static validateTelp(telp) {
        if (telp.length > 13 || telp.length < 3) {
            return false
        }
        return true
    }


    static addData(name, telp, email, company) {
        return new Promise((resolve, reject) => {

            if (Contact.validateEmail(email) === false) {
                reject("email not valid")
            }
            if (Contact.validateTelp(telp) === false) {
                reject("telp not valid")
            }
            else {
                Contact.findOne("Contacts", "email", `${email}`)
                    .then((data) => {
                        if (data !== undefined) {
                            reject("email sudah ada")
                        }
                        else {
                            let newData = new Contact(name, telp, email, company)
                            let data = `"${newData.name}","${newData.telp}","${newData.email}","${newData.company}"`
                            let column = `${Object.keys(newData)}`
                            Contact.save("Contacts", column, data)
                            resolve()
                        }
                    })
                    .catch((err) => {
                        reject(err)
                    })
            }
        })
    }
    static updateData(column, updateData, param, data) {
        return new Promise((resolve, reject) => {
            Contact.update("Contacts", column, updateData, param, data)
                .then(() => {
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
        })

    }
    static deleteData(column, data) {
        return new Promise((resolve, reject) => {
            Contact.delete("Contacts", column, data)
                .then(() => {
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    static AllData(callback) {
        let sql = `select Contacts.name, Contacts.telp, Contacts.email, Contacts.company, Groups.name AS GroupName from Contacts
        join ContactGroup on Contacts.id=ContactGroup.contact_id
        join Groups on ContactGroup.group_id=Groups.id
        order by Contacts.name `

        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) reject(err)
                else resolve(rows)
            })
        })
    }
}

module.exports = Contact