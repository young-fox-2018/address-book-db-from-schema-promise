const db = require('./database/db')

db.serialize(function(){
    db.run(`
    DROP TABLE IF EXISTS contacts
    `, function(err){
        if (err) {
            console.log(err)
        } else {
            console.log('drop table contacts')
        }
    })

    db.run(`
    DROP TABLE IF EXISTS groups
    `, function(err){
        if (err) {
            console.log(err)
        } else {
            console.log('drop table groups')
        }
    })

    db.run(`
    DROP TABLE IF EXISTS contact_group
    `, function(err){
        if (err) {
            console.log(err)
        } else {
            console.log('drop table contact_group')
        }
    })


    db.run(`
        CREATE TABLE contacts (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            nama varchar,
            perusahaan varchar,
            nomor_tlp varchar,
            email varchar
        )
    `, function(err){
        if (err) {
            console.log(err)
        } else {
            console.log('table contacts created')
        }
    })

    db.run(`
    CREATE TABLE groups (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        nama varchar
    )
    `, function(err){
        if (err) {
            console.log(err)
        } else {
            console.log('table groups created')
        }
    })

    db.run(`
    CREATE TABLE contact_group (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        contactId INTEGER REFERENCES contacts(id),
        groupId INTEGER REFERENCES groups(id)
    )
    `, function(err){
        if (err) {
            console.log(err)
        } else {
            console.log('table contact_group created')
        }
    })
})

db.close()