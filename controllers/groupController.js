const Group = require('../models/group')
const View = require('../views/view')

class GroupController {
    static createTable() {
        Group.createTable()
            .then(function () {
                View.showData(`Create Table Success`)
            })
            .catch(function (err) {
                View.showErr(err)
            })
    }
    static readDummyData() {
        Group.readDummyData()
            .then(function () {
                View.showData(`Data Dummy Success Added`)
            })
            .catch(function (err) {
                View.showErr(err)
            })
    }
    static add(name) {
        Group.add(name)
            .then(function () {
                View.showData(`Data with name ${name} has ben successfully added`)
            })
            .catch(function (err) {
                View.showErr(err)
            })
    }
    static findOne(field, value) {
        Group.findOne(field, value)
            .then(function (data) {
                View.showData(data)
            })
            .catch(function (err) {
                View.showErr(err)
            })
    }
    static update(field, newValue, fieldCondition, condition) {
        Group.update(field, newValue, fieldCondition, condition)
            .then(function () {
                View.showData(`Sucess Updated`)
            })
            .catch(function (err) {
                View.showErr(err)
            })
    }
    static delete(fieldId, id) {
        Group.delete(fieldId, id)
            .then(function () {
                View.showData(`Data with id ${id} has been successfully deleted`)
            })
            .catch(function (err) {
                View.showErr(err)
            })
    }
}


module.exports = GroupController