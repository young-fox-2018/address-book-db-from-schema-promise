const db = require("./connectDB")

class setup {
    static setupContacts() {
        let queryCreateContacts = `CREATE TABLE IF NOT EXISTS Contacts (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                                    name TEXT,
                                    company TEXT,
                                    telp TEXT,
                                    email TEXT UNIQUE
                                    );`
        return new Promise(function (resolve, reject) {
            db.serialize(function() {
                db.run(`DROP TABLE IF EXISTS Contacts`, function(err) {
                    if (err) reject(err)
                })
                db.run(queryCreateContacts, function(err) {
                    if (err) callback(err, null)
                    else {
                        resolve("Successfully create Contacts Table")
                    }
                })
            })    
        }) 
    }

    static setupGroups() {
        let queryCreateContacts = `CREATE TABLE IF NOT EXISTS Groups (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                                    name TEXT UNIQUE
                                    );`

        return new Promise(function (resolve, reject) {
            db.serialize(function() {
                db.run(`DROP TABLE IF EXISTS Groups`, function(err) {
                    if (err) reject(err)
                })
                db.run(queryCreateContacts, function(err) {
                    if (err) reject(err)
                    else {
                        resolve("Successfully create Groups Table")
                    }
                })
            })    
        })   
    }

    static setupContactsGroups() {
        let queryCreateContacts = `CREATE TABLE IF NOT EXISTS ContactsGroups (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                    contact_id INTEGER,
                                    group_id INTEGER,
                                    FOREIGN KEY (contact_id) REFERENCES Contacts (id),
                                    FOREIGN KEY (group_id) REFERENCES Groups (id)                              
                                    );`

        return new Promise(function(resolve, reject) {
            db.serialize(function() {
                db.run(`DROP TABLE IF EXISTS ContactsGroups`, function(err) {
                    if (err) reject(err)
                })
                db.run(queryCreateContacts, function(err) {
                    if (err) reject(err)
                    else {
                        resolve("Successfully create ContactsGroups Table")
                    }
                })
            })  
            db.close()  
        })       
    }
}

module.exports = setup