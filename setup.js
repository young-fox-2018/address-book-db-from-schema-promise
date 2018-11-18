const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./models/address_book.db');

db.serialize(function() {
    db.run(`DROP TABLE IF EXISTS Contacts`);
    db.run(`DROP TABLE IF EXISTS Groups`);
    db.run(`DROP TABLE IF EXISTS ContactGrou`);

    db.run(`CREATE TABLE IF NOT EXISTS Contacts
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name VARCHAR(30),
                    company VARCHAR(30),
                    phone VARCHAR(15),
                    email VARCHAR(30) UNIQUE
                )
            `, function(err) {
                if (!err) {
                    console.log(`Table Contacts created!`);
                } else {
                    console.log(err);
                }
            });

    db.run(`CREATE TABLE IF NOT EXISTS Groups
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    group_name VARCHAR(20)
                )
            `, function(err) {
                if(!err) {
                    console.log(`Table Groups created!`);
                } else {
                    console.log(err);
                }
            });

    db.run(`CREATE TABLE IF NOT EXISTS ContactGroup
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    contact_id INTEGER,
                    group_id INTEGER,
                        FOREIGN KEY (contact_id) REFERENCES Contacts (id),
                        FOREIGN KEY (group_id) REFERENCES Groups (id)
                )
            `, function(err) {
                if(!err) {
                    console.log(`Table ContactGroup created!`);
                } else {
                    console.log(err);
                }
            });
});
db.close();