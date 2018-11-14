let db = require(`./init`)
class Model {
    static insert(tableName,fields) {
        return new Promise((resolve, reject) => {
            
            let keys = Object.keys(fields)
            let values = []

            for (var property1 in fields) {
                values.push(`"${fields[property1]}"`);
            }
            
            let query = `INSERT INTO ${tableName} (${keys.join(",")}) VALUES (${values.join(",")})`
            console.log(query)
            db.run(query, function(err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(query)
                }
            })
        })
    }

    static findOne(name, tableName) {
        
        
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM ${tableName} WHERE nama = "${name}"`
            db.get(query, function(err, data) {

                if (err) {
                    reject(err)
                } else {
                    //console.log("type data === >",typeof data)
                    if (typeof data === "object") {
                        console.log("data model => ",data)
                        resolve(data)
                    } else {
                        resolve(null)
                    }   
                }
            })  
        })
    }
}

module.exports = Model