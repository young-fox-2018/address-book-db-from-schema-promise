let db = require(`./Models/init`)

let contact = `CREATE TABLE IF NOT EXISTS Contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama VARCHAR(50),
    nama_perusahaan VARCHAR,
    nomor_telepon INTEGER(30),
    email VARCHAR
);`

let group = `CREATE TABLE IF NOT EXISTS Groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama VARCHAR
);`

let contactGroup = `CREATE TABLE IF NOT EXISTS ContactGroups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_contact INTEGER,
    id_group INTEGER,
    FOREIGN KEY (id_group) REFERENCES Grup(id),
    FOREIGN KEY (id_contact) REFERENCES Contacts(id)
);`

db.serialize(function () {
    db.run(group, function (err) {
        if (err) {
            throw err
        }
        console.log("berhasil buat table group");

    })
    db.run(contact, function (err) {
        if (err) {
            throw err
        }
        console.log("berhasil buat table contact");

    })
    db.run(contactGroup, function (err) {
        if (err) {
            throw err
        }
        console.log("berhasil buat table contactGroup");

    })
})
db.close()
