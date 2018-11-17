const Model = require ('./model.js')

class Contact {
  static create(table, data) {
    return new Promise(function(resolve, reject) {
      const objData = {
        name: data[0],
        company: data[1],
        phone_number: data[2],
        email: data[3]
      }
      Model.create(table, objData)
        .then(function(data) {
          resolve(data)
        })
        .catch(function(err) {
          reject(err)
        })
    })
  }

  static read(table, data) {
    return new Promise(function(resolve, reject) {
      Model.findAll(table, data)
        .then(function(data) {
          resolve(data)
        })
        .catch(function(err) {
          reject(err)
        })
    })
  }

  static update(table, data) {
    return new Promise(function(resolve, reject) {
      Model.update(table, data, "name")
        .then(function(data) {
          resolve(data)
        })
        .catch(function(err) {
          reject(err)
        })
    })
  }

  static delete(table, data) {
    return new Promise(function(resolve, reject) {
      let contactId = 0
      Model.findOne(table, {name:data[0]})
        .then(function(dataContact) {
          contactId = dataContact.id
          return Model.delete("contacts", {id: contactId})
        })
        .then(function() {
          return Model.delete("contactgroup", {contact_id: contactId})
        })
        .then(function(data) {
          resolve(data)
        })
        .catch(function(err) {
          reject(err)
        })
    })
  }
}

module.exports = Contact