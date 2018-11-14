const Model = require("./model")
const db = require("../database/connection")

class Group extends Model {
    constructor(name, telp, email, company) {
        super()
        this.name = name
    }

    static addData(name) {
        return new Promise((resolve, reject) => {
            Group.findOne("Groups", "name", `${name}`)
                .then((data) => {
                    if (data !== undefined) {
                        reject("nama group sudah ada")
                    }
                    else {
                        let newData = new Group(name)
                        let data = `"${newData.name}"`
                        let column = `${Object.keys(newData)}`

                        Group.save("Groups", column, data)
                        resolve()
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    static updateData(column, updateData, param, data) {
        console.log();

        return new Promise((resolve, reject) => {
            Group.update("Groups", column, updateData, param, data)
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
            Group.delete("Groups", column, data)
                .then(() => {
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    static AllData() {
        let sql = `select  Groups.name AS GroupName, Contacts.name, Contacts.telp, Contacts.email, Contacts.company from Contacts
        join ContactGroup on Contacts.id=ContactGroup.contact_id
        join Groups on ContactGroup.group_id=Groups.id
        order by Groups.name `

        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) reject(err)
                else resolve(rows)
            })
        })
    }
}

module.exports = Group