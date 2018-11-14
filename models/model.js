const db = require("../database/connection")
class Model {

    static save(table, columns, data) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO ${table} (${columns})VALUES (${data})`,
                (err) => {
                    if (err) reject(err)
                    else resolve(null)
                }
            )
        })
    }

    static findOne(table, columns, param) {
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT * FROM ${table} WHERE ${columns}="${param}" `,
                (err, data) => {
                    if (err) reject(err)
                    else resolve(data)
                }
            )
        })
    }

    static update(table, column, updateData, param, data) {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE  ${table} SET ${column} = "${updateData}" WHERE ${param} = ${data}`,
                (err) => {
                    if (err) reject(err)
                    else resolve(null)
                });
        });
    }
    static delete(table, column, data) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM ${table} WHERE ${column} = ${data}`,
                (err) => {
                    if (err) eject(err)
                    else resolve(null)
                });
        });
    }
}

module.exports = Model