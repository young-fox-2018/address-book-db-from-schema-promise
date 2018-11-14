const Model = require('./model')
const fs = require('fs')
const dataContactGroup = JSON.parse(fs.readFileSync('./database/contactGroup.json'))

class ContactGroup {
    static createTable() {
        return new Promise(function (resolve, reject) {
            let fields = `id INTEGER PRIMARY KEY AUTOINCREMENT,
                          contactId INTEGER,
                          groupId INTEGER,
                          FOREIGN KEY (groupId) REFERENCES Groups(id),
                          FOREIGN KEY (contactId) REFERENCES Contacts(id)`

            Model.createTable('contactGroup', fields)
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
            for (let i = 0; i < dataContactGroup.length; i++) {
                let dummyContactGroup = `(null, ${dataContactGroup[i].contactId}, ${dataContactGroup[i].groupId})`
                Model.create('contactGroup', dummyContactGroup)
                    .then(function () {
                        resolve()
                    })
                    .catch(function (err) {
                        reject(err)
                    })
            }
        })
    }


    static add(contactId, groupId) {
        return new Promise(function (resolve, reject) {
            let data = `(null, "${contactId}", "${groupId}")`
            Model.create('contactGroup', data)
                .then(function () {
                    resolve()
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    }
    static showcontactGroup(groupName) {
        return new Promise(function (resolve, reject) {
            Model.findContactGroup('Contacts', 'Groups', 'contactGroup', groupName)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    }
}



module.exports = ContactGroup