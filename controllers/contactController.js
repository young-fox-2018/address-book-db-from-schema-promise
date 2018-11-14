const Contact = require('../models/contact')
const View = require('../views/view')

class ContactController {
    static createTable() {
        Contact.createTable()
            .then(function () {
                View.showData(`Create Table Success`)
            })
            .catch(function (err) {
                View.showErr(err)
            })
    }
    static add(name, email, phone, company) {
        Contact.add(name, email, phone, company)
            .then(function () {
                View.showData(`Data with name ${name} success added`)
            })
            .catch(function (err) {
                View.showErr(err)
            })
    }

    static readDummyData() {
        Contact.readDummyData()
            .then(function () {
                View.showData(`Dummy data success added`)
            })
            .catch(function (err) {
                View.showErr(err)
            })
    }

    static findOne(field, value) {
        Contact.findOne(field, value)
            .then(function (data) {
                View.showData(data)
            })
            .catch(function (err) {
                View.showErr(err)
            })
    }

    static update(field, newValue, fieldCondition, condition) {
        Contact.update(field, newValue, fieldCondition, condition)
            .then(function () {
                View.showData(`Success Updated`)
            })
            .catch(function (err) {
                View.showErr(err)
            })
    }
    static delete(fieldId, id) {
        Contact.delete(fieldId, id)
            .then(function () {
                View.showData(`Data with id ${id} has been successfully deleted`)
            })
            .catch(function (err) {
                View.showErr(err)
            })
    }



}


module.exports = ContactController