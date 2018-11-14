const db = require('../db')

class Contact {
    static executeQuery(qry) {
        return new Promise((resolve, reject) => {
            db.run(qry, err => {
                if (err) reject(err)
                else resolve([])
            })

        })
    }
    static findAll() {
        return new Promise((resolve, reject) => {
            let qry = `SELECT * FROM Contacts`
            db.all(qry, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }
    static findOne(params) {
        return new Promise((resolve, reject) => {
            let qry = `SELECT * FROM Contacts WHERE `
            for (let key in params) {
                qry += `${key} = "${params[key]}" AND `
            }
            qry = qry.slice(0, qry.length - 5)
            db.get(qry, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }
    static create(params) {
        return new Promise((resolve, reject) => {
            let qry = `INSERT INTO Contacts (name, company, phone, email)
                        VALUES ("${params.name}", "${params.company}", "${params.phone}", "${params.email}")`
            this.executeQuery(qry)
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })

    }
    static update(id, params) {
        return new Promise((resolve, reject) => {
            let qry = `UPDATE Contacts 
                        SET `
            for(let key in params) {
                qry += `${key} = "${params[key]}", `
            }
            qry = qry.slice(0, qry.length - 2) 
            qry += ` WHERE id = ${id}`
            this.executeQuery(qry)
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

module.exports = Contact