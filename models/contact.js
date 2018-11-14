const Model = require("./model")
const db = require("./connectDB")

class Contact extends Model {
    static create(values) {
        let query = `INSERT INTO Contacts (name, company, telp,email) 
                     VALUES ("${values[0]}", "${values[1]}", "${values[2]}", "${values[3]}");`
        
        return new Promise (function(resolve, reject) {
            Model.execute(query)
                .then(function() {
                    resolve(`Successfully inserted ${values} to table Contacts`)
                })
                .catch(function(err){
                    reject(err)
                })
        })
    }

    static find() {
        let query = `SELECT * FROM Contacts`
        return new Promise(function(resolve, reject) {
            db.all(query, function(err, row) {
                if (err) reject(err)
                resolve(row)
            })
        })
    }
}


module.exports = Contact;
