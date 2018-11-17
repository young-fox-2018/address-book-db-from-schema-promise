const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

class Model  {

  static findOne(table, objData) {
    return new Promise(function(resolve, reject) {
      const field = Object.keys(objData)
      const value = Object.values(objData)

      let query = `
      SELECT * FROM ${table} WHERE ${field.join()} = "${value.join()}" `

      db.get(query,function(err, row) {
        if (err) {
          reject(err)
        }
        else {
          resolve(row)
        }
      })
    })
  }

  static findAll(table, data) {
    return new Promise(function(resolve, reject) {
      let query = `
      SELECT * FROM ${table}`

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

  static create(table, objData) {
    return new Promise(function(resolve, reject) {
      const field = Object.keys(objData)

      let value = []
      for (let key in objData) {
        value.push(`"${objData[key]}"`)
      }

      let query = `
      INSERT INTO ${table} (${field.join(", ")}) VALUES (${value.join(", ")});`

      db.run(query, function(err) {
        if (err) {
          reject(err)
        }
        else {
          resolve(objData)
        }
      })
    })
  }

  static update(table, data, field) {
    return new Promise(function(resolve, reject) {
      let query = `
      UPDATE ${table} SET ${data[1]} = "${data[2]}" WHERE ${field} = "${data[0]}";`

      db.run(query, function(err) {
        if (err) {
          reject(err)
        }
        else {
          resolve(this)
        }
      })
    })
  }

  static delete(table, objData) {
    return new Promise(function(resolve, reject) {
      const field = Object.keys(objData)
      const value = Object.values(objData)

      let query = `
      DELETE FROM ${table} WHERE ${field.join()} = "${value.join()}" `

      db.run(query,function(err) {
        if (err) {
          reject(err)
        }
        else {
          resolve(this)
        }
      })
    })
  }
}

module.exports = Model