const db = require('./db')
db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS Contacts`)
    db.run(`DROP TABLE IF EXISTS ContactGroups`)
    db.run(`DROP TABLE IF EXISTS Groups`)
    db.run(`CREATE TABLE IF NOT EXISTS Contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255),
        company VARCHAR(255),
        phone VARCHAR(255) UNIQUE,
        email VARCHAR(255) UNIQUE
    )`, err => {
        if (err) throw err
        else console.log("Contacts table created!")
    })
    db.run(`CREATE TABLE IF NOT EXISTS Groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255)
    )`, err => {
        if (err) throw err
        else console.log("Groups table created!")
    })
    db.run(`CREATE TABLE IF NOT EXISTS ContactGroups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contactId INTEGER,
        groupId INTEGER,
            FOREIGN KEY (contactId) REFERENCES Contacts(id),
            FOREIGN KEY (groupId) REFERENCES Groups(id)
    )`, err => {
        if (err) throw err
        else console.log("ContactGroups table created!")
    })
    // db.close()
})
