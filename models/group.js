const Model = require('./model')
const fs = require('fs')
const dataGroups = JSON.parse(fs.readFileSync('./database/Group.json'))

class Group {
    static createTable() {
        return new Promise(function (resolve, reject) {
            let fields = `id INTEGER PRIMARY KEY AUTOINCREMENT,
                          name TEXT NOT NULL`
            Model.createTable('Groups', fields)
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
            for (let i = 0; i < dataGroups.length; i++) {
                let dummyGroups = `(null, "${dataGroups[i].name}")`
                Model.create('Groups', dummyGroups)
                    .then(function () {
                        resolve()
                    })
                    .catch(function (err) {
                        reject(err)
                    })
            }
        })
    }
    static add(name) {
        return new Promise(function (resolve, reject) {
            let data = `(null, "${name}")`
            Model.create('Groups', data)
                .then(function () {
                    resolve()
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    }
    static findOne(field, value) {
        return new Promise(function (resolve, reject) {
            Model.findOne('Groups', field, value)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    }
    static update(field, newValue, fieldCondition, condition) {
        return new Promise(function (resolve, reject) {
            Model.update('Groups', field, newValue, fieldCondition, condition)
                .then(function () {
                    resolve()
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    }
    static delete(fieldId, id) {
        return new Promise(function (resolve, reject) {
            Model.delete('Groups', fieldId, id)
                .then(function () {
                    resolve()
                })
                .catch(function (err) {
                    reject(err)
                })

        })
    }
}




module.exports = Group