const Model = require("./model")
const db = require("./connectDB")

class Conjunction extends Model {
    static create(values) {
        let query = `INSERT INTO ContactsGroups (contact_id, group_id) 
                     VALUES ("${values[0]}", "${values[1]}")`
        return new Promise (function(resolve, reject) {
            Model.execute(query) 
                .then(function() {
                    resolve(`Successfully inserted ${values} to table Groups`)
                })
                .catch(function(err){
                 reject(err)
                })
        })
    }

    static find() {
        let query = `SELECT * FROM ContactsGroups`
        return new Promise(function(resolve, reject) {
            db.all(query, function(err, row) {
                if (err) reject(err)
                resolve(row)
            })
        })
    }
}

module.exports = Conjunction