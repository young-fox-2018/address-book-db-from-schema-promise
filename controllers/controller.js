const View = require("../views/view")
const Setup = require("../models/setup")
const Model = require("../models/model")
const Contact = require("../models/contact")
const Group = require("../models/group")
const Conjunction = require("../models/contact-group")

class Controller {
    static setup() {
        Setup.setupContacts()
            .then(function (message) {
                View.printLine(message)
            })
            .catch(function (err) {
                View.printError(err)
            })
        Setup.setupGroups()
            .then(function (message) {
                View.printLine(message)
            })
            .catch(function (err) {
                View.printError(err)
            })
        Setup.setupContactsGroups()
            .then(function (message) {
                View.printLine(message)
            })
            .catch(function (err) {
                View.printError(err)
            }) 
    }
    // CREATE
    static create(table, values) {
        if (table == "Contacts") {
            Contact.create(values)
                .then(function(message) {
                    View.printLine(message)
                })
                .catch(function(err) {
                    View.printError(err)
                })
        } else if (table == "Groups") {
            Group.create(values)
                .then(function(message) {
                    View.printLine(message)
                })
                .catch(function(err) {
                    View.printError(err)
                })

        } else if (table == "ContactsGroups") {
            Conjunction.create(values)
                .then(function(message) {
                    View.printLine(message)
                })
                .catch(function(err) {
                    View.printError(err)
                })
        } else {
            View.printError("Table doesn't exist")
        }
    }

    // Read 
    static find(column) {
        if (column == "Contacts") {
            Contact.find()
                .then(function(data) {
                    View.printLine(data)
                })
                .catch(function(err) {
                    View.printError(err)
                })

        } else if (column == "Groups") {
            Group.find()
                .then(function(data) {
                    View.printLine(data)
                })
                .catch(function(err) {
                    View.printError(err)
                })
        } else  if (column == "ContactsGroups") {
            Conjunction.find()
                .then(function(data) {
                    View.printLine(data)
                })
                .catch(function(err) {
                    View.printError(err)
                })
        }
        else {

        }
    }

    // update

    static update(id, array) {
        let options = {}
        for (let i = 0; i < array.length; i+=2) {
            options[array[i]] = array[i + 1]
        }
        Model.update(id, options)
            .then(function(data) {
                View.printLine(data)
            })
            .catch(function(err) {
                View.printError(err)
            })

    }


    
}

module.exports = Controller