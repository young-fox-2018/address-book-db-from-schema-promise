const db = require('./db')

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS contacts`)
    db.run(`DROP TABLE IF EXISTS groups`)
    db.run(`DROP TABLE IF EXISTS contactGroup`)

    db.run(`CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        company TEXT NOT NULL,
        phone INTEGER NOT NULL,
        email TEXT NOT NULL UNIQUE

    )`, (err) => {
            if (err) throw err
        })
    db.run(`CREATE TABLE IF NOT EXISTS groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )`, (err) => {
            if (err) throw err
        })
    db.run(`CREATE TABLE IF NOT EXISTS contactGroup (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contactId INTEGER NOT NULL,
        groupId INTEGER NOT NULL,
            FOREIGN KEY (contactId) REFERENCES contacts (id)
            FOREIGN KEY (groupId) REFERENCES groups (id)
    )`, (err) => {
            if (err) throw err
        })
}
)

db.close()