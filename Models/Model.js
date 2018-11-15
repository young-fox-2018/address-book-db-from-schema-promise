const db = require('../Database/db')

class Model {
    static findOne(table, field, value) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM ${table} WHERE ${field}='${value}'`
            db.get(query, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    static findAll(table) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM ${table}`
            db.all(query, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    static save(table, colum, data) {
        return Promise((resolve, reject) => {
            let query = `INSERT INTO ${table} (${colum}) VALUES (${data})`
            db.run(query, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(null)
                }
            })
        })
    }

}

module.exports = Model