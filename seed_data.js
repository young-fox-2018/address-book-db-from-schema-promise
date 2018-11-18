const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./models/address_book.db');
const fs = require('fs');

let contacts = fs.readFileSync('./contacts.json', 'utf8');
contacts = JSON.parse(contacts);
let groups = fs.readFileSync('./groups.json', 'utf8');
groups = JSON.parse(groups);
let contactgroup = fs.readFileSync('./contactgroup.json', 'utf8');
contactgroup = JSON.parse(contactgroup);

db.serialize(function() {
    let queryContacts = `INSERT INTO Contacts (name, company, phone, email) VALUES `    
    for (let i = 0; i < contacts.length; i++) {
        if (i !== contacts.length - 1) {
            queryContacts += `("${contacts[i].name}", "${contacts[i].company}", "${contacts[i].phone}", "${contacts[i].email}"), `;
        } else {
            queryContacts += `("${contacts[i].name}", "${contacts[i].company}", "${contacts[i].phone}", "${contacts[i].email}")`;

        }
    }    
    db.run(queryContacts, function(err) {
        if (err) {
            console.log(`Error insert dummy data for Contacts`);
        } else {
            console.log(`Contacts dummy data inserted`);
        }
    });
    
    let queryGroups = `INSERT INTO Groups (group_name) VALUES `
    for (let i = 0; i < groups.length; i++) {
        if (i !== groups.length - 1) {
            queryGroups += `("${groups[i].group_name}"), `;
        } else {
            queryGroups += `("${groups[i].group_name}")`;
        }
    }
    db.run(queryGroups, function(err) {
        if (err) {
            console.log(`Error insert dummy data for Groups`);
        } else {
            console.log(`Groups dummy data inserted`);
        }
    });
    
    let queryContactGroup = `INSERT INTO ContactGroup (contact_id, group_id) VALUES `;
    for (let i = 0; i < contactgroup.length; i++) {
        if (i !== contactgroup.length - 1) {
            queryContactGroup += `(${contactgroup[i].contact_id}, ${contactgroup[i].group_id}), `;
        } else {
            queryContactGroup += `(${contactgroup[i].contact_id}, ${contactgroup[i].group_id})`;
        }
    }
    db.run(queryContactGroup, function(err) {
        if (err) {
            console.log(`Error insert dummy data for ContactGroup`);
        } else {
            console.log(`ContactGroup dummy data inserted`);
        }
    });
});
db.close();