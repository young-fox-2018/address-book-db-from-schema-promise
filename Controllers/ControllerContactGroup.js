const ContactGroup = require('../Models/Contact-group')
const Contacts = require('../Models/Contact')
const Group = require('../Models/Group')
const View = require('../Views/View')
const Model = require('../Models/Model')

class ControllerContactGroup {
    
    static create (option) {
        let contactData = null
        let groupData = null
        Contacts.findOne({
            table: 'contacts',
            field: 'name',
            value: option[1]
        })
        .then((data) => {
            if(!data) {
                throw "Nama contact tidak ditemukan"
            } else {
                contactData = data
                return Group.findOne({
                    table: 'groups',
                    field: 'name',
                    value: option[2]
                })
            }
        })
        .then((data) => {
            if(!data) {
                throw 'Nama group tidak di temukan'
            } else {
                groupData = data
                return ContactGroup.create({
                    contact_id: contactData.id,
                    group_id: groupData.id
                }, option[0])
            }
        })
        .then((data) => {
            View.successCreate(`${contactData.name} ke dalam ${groupData.name}`)
        })
        .catch((err) => {
            View.errDisplay(err)
        })
        
    }
    
}

module.exports = ControllerContactGroup