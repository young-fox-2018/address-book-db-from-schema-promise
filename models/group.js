const Model = require("./model")
const db = require("./connectDB")

class Group extends Model {
    static create(values) {
        let query = `INSERT INTO Groups (name) 
                     VALUES ("${values[0]}");`
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
        let query = `SELECT * FROM Groups`
        return new Promise(function(resolve, reject) {
            db.all(query, function(err, row) {
                if (err) reject(err)
                resolve(row)
            })
        })
    }

    


}


// super(create(ganti2 aja parameter nya))
module.exports = Group