const db = require("./connectDB")

class Model {
    // Read All
    static find() {
        let query = `SELECT * FROM Contacts`
        return new Promise(function(resolve, reject) {
            db.all(query, function(err, row) {
                if (err) reject(err)
                resolve(row)
            })
        })
    }

    // Read One
    static findOne(table, options) {
        let query = `SELECT * FROM ${table} WHERE `
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                let element = options[key];
                query += key 
                query += " = "
                query += `"${element}"`
                query += " AND "
            }
        }
        query = query.slice(0,query.length - 5)
        return new Promise(function(resolve, reject){
            db.get(query, function(err,row) {
                if (err) reject(err)
                resolve(row)
            })
        })
   
    }

    static execute(query) {
        return new Promise(function(resolve, reject) {
            db.run(query, function(err) {
                if (err) reject(err)
                else {
                    resolve(null)
                }
            })
        })
    }
    // CREATE
    static create(values) {
        let query = `INSERT INTO Contacts (name, company, telp,email) 
                     VALUES ("${values[0]}", "${values[1]}", "${values[2]}", "${values[3]}");`
        return new Promise (function(resolve, reject) {
            Model.execute(query)
                .then(function(message) {
                    resolve(null)
                })
                .catch(function(err){
                    reject(err)
                })
        })
    }

    static update(id, options) {
        let query = `UPDATE Contacts SET `
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                const element = options[key];
                query += key; query += " = "; query += `"${element}"`; query += " , " 
            }
        }
        query = query.slice(0, query.length - 2)
        query += `WHERE id = ${id};`

        return new Promise (function(resolve, reject) {
            Model.execute(query)
                .then(function(data){
                    if (data.length >= id) {
                        resolve("Successfully updated data")
                    } else {
                        resolve("id not found")
                    }
                })
                .catch(function(err){
                    reject(err)
                })
        })
    }
}

module.exports = Model;
