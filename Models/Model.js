const db = require('../db')

class Model {

    static runner (data, val) {
        return new Promise ((resolve, reject) => {
            db.run(data, val, function(err) {
                if(err) {
                    reject(err)
                } else {
                    resolve(this)
                }
            })
        })
    }
    
    static findOne (option) {
        return new Promise ((resolve, reject) => {
            let query =
            `
            SELECT *
            FROM "${option.table}"
            WHERE "${option.field}" = "${option.value}"
            `
            db.get(query, function(err, data) {
                if(err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    static create (option, table) {
        return new Promise ((resolve, reject) => {
            let keys = Object.keys(option)
            let val = keys.map(() => '?')
            let query =
            `
            INSERT INTO ${table}
                (${keys.join(', ')})
            VALUES
                (${val.join(', ')})
            `
            Model.runner(query, Object.values(option))
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

}

module.exports = Model