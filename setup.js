const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./address_book.db')

db.serialize(function(){
    db.run('DROP TABLE IF EXISTS Groups')
    db.run('DROP TABLE IF EXISTS Contacts')
    db.run('DROP TABLE IF EXISTS ContactsGroups')

    let createGroups = `
        CREATE TABLE IF NOT EXISTS Groups(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        group_name VARCHAR(30)
    )
    `

    let createContacts = `
        CREATE TABLE IF NOT EXISTS Contacts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(30),
        company VARCHAR(100),
        phone_number VARCHAR(14),
        email VARCHAR(30)
    )
    `

    let createContactGroups = `
        CREATE TABLE IF NOT EXISTS ContactsGroups(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contactId INTEGER,
        groupId INTEGER,
        FOREIGN KEY (contactId) REFERENCES Contacts(Id),
        FOREIGN KEY (groupId) REFERENCES Groups(Id)
    )
    `

    db.run(createContacts,function(err){
        if(err){
            console.log({
                Message: "error create table Contacts",
                Error: err
            })
        } else {
            console.log("---Successfully create table Contacts---")
        }
    })

    db.run(createGroups,function(err){
        if(err){
            console.log({
                Message: "error create table Groups",
                Error: err
            })
        } else {
            console.log("---Successfully create table Groups---")
        }
    })

    db.run(createContactGroups,function(err){
        if(err){
            console.log({
                Message: "error create table ContactsGroups",
                Error: err
            })
        } else {
            console.log("---Successfully create table ContactsGroups---")
        }
    })

})
db.close()