const db = require('../database/db')


class Model {
    static createTable(tableName, field) {
        return new Promise(function (resolve, reject) {
            db.serialize(function () {
                db.run(`DROP TABLE IF EXISTS ${tableName}`, function (err) {
                    if (err) {
                        reject(err)
                    }
                })
                db.run(`CREATE TABLE ${tableName} (
                        ${field}
                        )`, function (err) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(null)
                        }
                    })
            })
        })
    }
    static create(tableName, field) {
        return new Promise(function (resolve, reject) {
            console.log('===', `INSERT INTO ${tableName} VALUES ${field}`)
            db.run(`INSERT INTO ${tableName} VALUES ${field}`, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(null)
                }
            })
        })
    }
    static findAll(tableName) {
        return new Promise(function (resolve, reject) {
            db.all(`SELECT * FROM ${tableName}`, function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    static findOne(tableName, field, values) {
        return new Promise(function (resolve, reject) {
            db.get(`SELECT * FROM ${tableName} WHERE ${field} = "${values}"`, function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    static update(tableName, field, newValue, fieldCondition, condition) {
        return new Promise(function (resolve, reject) {
            db.run(`UPDATE ${tableName}
                    SET ${field} = "${newValue}"
                    WHERE ${fieldCondition} = "${condition}"`, function (err) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(null)
                    }
                })
        })
    }
    static delete(tableName, fieldId, id) {
        return new Promise(function (resolve, reject) {
            db.run(`DELETE FROM ${tableName} WHERE ${fieldId}= "${id}"`, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(null)
                }
            })
        })
    }
    static findContactGroup(tableContacts, tableGroup, tablecontactGroup, groupName) {
        return new Promise(function (resolve, reject) {
            db.all(`SELECT a.id, a.name FROM ${tableContacts} a
                    INNER JOIN ${tablecontactGroup} b
                    ON a.id = b.contactId
                    INNER JOIN ${tableGroup} c
                    ON c.id = b.groupId
                    WHERE c.name = "${groupName}"
                    GROUP BY a.name`, function (err, data) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })
        })
    }
}



module.exports = Model