const Model = require ('./model.js')

class Group {
  static create(table, data) {
    return new Promise(function(resolve, reject) {
      const objData = {
        group_name: data[0]
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
      Model.update(table, data, "group_name")
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
      let groupId = 0
      Model.findOne(table, {group_name:data[0]})
        .then(function(dataGroup) {
          groupId = dataGroup.id
          return Model.delete("groups", {id: groupId})
        })
        .then(function() {
          return Model.delete("contactgroup", {group_id: groupId})
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

module.exports = Group