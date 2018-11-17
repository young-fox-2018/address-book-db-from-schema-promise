const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');
const Model = require ('./model.js')

class ContactGroup {
  static create(table, data) {
    let contactId = 0
    let groupId = 0
    return new Promise(function(resolve, reject) {
      Model.findOne("contacts",{name:data[0]})
        .then(function(dataContact) {
          contactId = dataContact.id
          return Model.findOne("groups",{group_name:data[1]})
        })
        .then(function(dataGroup) {
          groupId = dataGroup.id
          return Model.create(table, {contact_id: contactId, group_id: groupId})
        })
        .then(function(dataContactGroup) {
          resolve(data)
        })
        .catch(function(err) {
          reject(err)
        })
    })
  }

  static read() {
    return new Promise(function(resolve, reject) {
      let query = `
      SELECT contacts.name, groups.group_name
      FROM contactgroup
      JOIN contacts ON contact_id = contacts.id
      JOIN groups ON group_id = groups.id`

      db.all(query, function(err, rows) {
        if (err) {
          reject(err)
        }
        else {
          resolve(rows)
        }
      })
    })
  }

}

module.exports = ContactGroup