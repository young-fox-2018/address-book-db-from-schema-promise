const Model = require('../models/Model')
const Contacts = require('../models/Contacts')
const Groups = require('../models/Groups')
const ContactGroup = require('../models/ContactGroup')
const View = require('../views/View')

class Controller {
    static create (table, params) {

        if (table === 'contacts') {
            Contacts.createContact(table, params)
                .then((msg) => {
                    View.displayMsg(msg)
                })
                .catch((err) => {
                    View.displayError(err)
                })
        } else if (table === 'groups') {
            Groups.create(table, params)
                .then((msg) => {
                    View.displayMsg(msg)
                })
                .catch((err) => {
                    View.displayError(err)
                })
        } else {
            View.displayError(`Table ${table} tidak ditemukan`)
        }

    }

    static addGroup (email, group) {
        ContactGroup.add(email, group)
            .then((msg) => {
                View.displayMsg(msg)
            })
            .catch((err) => {
                View.displayError(err)
            })
    }

    static show (table, params) {
        if (table === 'contacts') {
            Contacts.show(table, params)
                .then((data) => {
                    View.displayMsg(data)
                })
                .catch((err) => {
                    View.displayError(err)
                })

        } else if (table === 'groups') {
            Groups.show(table, params)
                .then((data) => {
                    View.displayMsg(data)
                })
                .catch((err) => {
                    View.displayError(err)
                })
        } else {
            View.displayError(`Table ${table} tidak ditemukan`)
        }

    }
}

module.exports = Controller