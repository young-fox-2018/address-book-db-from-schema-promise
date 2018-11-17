const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./data.db');

let droptableContacts = `DROP TABLE IF EXISTS contacts;`
let droptableGroups = `DROP TABLE IF EXISTS groups;`
let droptableContactGroup = `DROP TABLE IF EXISTS contactgroup;`


let createTableContacts = `
  CREATE TABLE contacts
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30) UNIQUE,
    company VARCHAR(30),
    phone_number VARCHAR(14) UNIQUE,
    email VARCHAR(30) UNIQUE
  );`

let createTableGroups = `
  CREATE TABLE groups
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_name VARCHAR(30)
  );`

let createTableContactGroup = `
  CREATE TABLE contactgroup
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contact_id INTEGER,
    group_id  INTEGER,
    FOREIGN KEY (contact_id) REFERENCES contacts(id)
    FOREIGN KEY (group_id) REFERENCES groups(id)
  )`

db.serialize(function () {
  db.run(droptableContacts, function(err) {
    if (err) {
      throw err
    }
  })

  db.run(droptableGroups, function(err) {
    if (err) {
      throw err
    }
  })

  db.run(droptableContactGroup, function(err) {
    if (err) {
      throw err
    }
  })

  db.run(createTableContacts, function(err) {
    if (err) {
      throw err
    }
    console.log(`Berhasil bikin table contacts`);
  })

  db.run(createTableGroups, function(err) {
    if (err) {
      throw err
    }
    console.log(`Berhasil bikin table groups`);
  })

  db.run(createTableContactGroup, function(err) {
    if (err) {
      throw err
    }
    console.log(`Berhasil bikin table contactgroup`);
  })
})