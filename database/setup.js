const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./database.db")


db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS Contacts(
            id INTEGER  NOT NULL PRIMARY KEY  AUTOINCREMENT,
            name TEXT NOT NULL,
            telp TEXT NOT NULL,
            email TEXT NOT NULL,
            company TEXT NOT NULL
        )`,
        (err) => {
            if (err) console.log(err.message)
        }
    )
    db.run(
        `CREATE TABLE IF NOT EXISTS ContactGroup(
            id INTEGER  NOT NULL PRIMARY KEY  AUTOINCREMENT,
            contact_id INTEGER NOT NULL,
            group_id  INTEGER NOT NULL,
            FOREIGN KEY (group_id) REFERENCES Groups (id),
            FOREIGN KEY (contact_id) REFERENCES Contacts (id)
    
        )`,
        (err) => {
            if (err) console.log(err.message)
        }
    )
    db.run(
        `CREATE TABLE IF NOT EXISTS Groups(
            id INTEGER  NOT NULL PRIMARY KEY  AUTOINCREMENT,
            name TEXT NOT NULL
        )`,
        (err) => {
            if (err) console.log(err.message)
        }
    )
})

db.close()
