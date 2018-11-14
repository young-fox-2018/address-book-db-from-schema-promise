const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./address_book.db')

db.serialize(function() {

    let contact = 
    `
    CREATE TABLE contacts
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR UNIQUE,
        company VARCHAR,
        phone VARCHAR UNIQUE,
        email VARCHAR UNIQUE
    );
    `
    db.run(contact, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log(`success`)
        }
    })

    let group = 
    `
    CREATE TABLE groups
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR UNIQUE
    );
    `
    db.run(group, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log(`success`)
        }
    })

    let contactGroup = 
    `
    CREATE TABLE contact_group
    (
        contact_id INTEGER,
        group_id INTEGER,
        FOREIGN KEY (contact_id) REFERENCES contacts(id),
        FOREIGN KEY (group_id) REFERENCES groups(id)
    );
    `
    db.run(contactGroup, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log(`success`)
        }
    })

})