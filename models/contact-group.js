const Model = require("./model")


class ContactGroup extends Model {
    constructor(contact_id, group_id) {
        super()
        this.contact_id = contact_id
        this.group_id = group_id
    }

    static addData(contact_id, group_id) {
        return new Promise((resolve, reject) => {
            let newData = new ContactGroup(contact_id, group_id)
            let data = `"${newData.contact_id}","${newData.group_id}"`
            let column = `${Object.keys(newData)}`
            ContactGroup.save("ContactGroup", column, data)
                .then(() => {
                    resolve()
                })
                .catch(() => {
                    reject(err)
                })

        })
    }

    static updateData(column, updateData, param, data) {
        return new Promise((resolve, reject) => {
            ContactGroup.update("ContactGroup", column, updateData, param, data)
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
            ContactGroup.delete("ContactGroup", column, data)
                .then(() => {
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}

module.exports = ContactGroup