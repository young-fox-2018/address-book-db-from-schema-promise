const ContactGroup = require('../models/contact-group')
const View = require('../views/view')

class ContactGroupController {
    static createTable() {
        ContactGroup.createTable()
            .then(function () {
                View.showData(`Create Table Success`)
            })
            .catch(function (err) {
                View.showErr(err)
            })
    }
    static readDummyData() {
        ContactGroup.readDummyData()
            .then(function () {
                View.showData(`Dummy Data Success Added`)
            })
            .catch(function (err) {
                View.showErr(err)
            })
    }
    static add(contactId, groupId) {
        ContactGroup.add(contactId, groupId)
            .then(function () {
                View.showData(`Contact Group with Contact ID : ${contactId} AND Group ID : ${groupId} success added`)
            })
            .catch(function (err) {
                View.showErr(err)
            })
    }
    static showContactGroup(groupName) {
        ContactGroup.showcontactGroup(groupName)
            .then(function (data) {
                let listContact = ''
                data.forEach(function (element, index) {
                    if (index !== data.length - 1) {
                        listContact += `${index + 1}.${element.name} \n`
                    } else {
                        listContact += `${index + 1}.${element.name}`
                    }
                })
                View.showData(`Group ${groupName}:
${listContact}`)
            })
            .catch(function (err) {
                View.showErr(err)
            })
    }
}


module.exports = ContactGroupController