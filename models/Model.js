const db = require('../models/Database');

class Model {
    static create(table, options) {
        return new Promise( function(resolve, reject) {
            const fields = Object.keys(options);

            let values = [];
            for (let key in options) {
                values.push(`"${options[key]}"`);
            }

            const query = `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${values.join(', ')})`;
            db.run(query, function(err) {
                if (err) {
                    reject({
                        msg: `Error insert data`, 
                        err: err});
                } else {
                    resolve(options);
                }
            });
        });
    }

    static update(table, id, options) {
        return new Promise (function (resolve, reject) {
            let arr = [];
            for (let key in options) {
                arr.push(`${key} = "${options[key]}"`);
            }
            
            const query = `UPDATE ${table} SET ${arr.join(', ')} WHERE id = ${id}`;

            db.run(query, function(err) {
                if (err) {
                    reject({
                        msg: `Error updating data`, 
                        err: err});
                } else {
                    resolve(this)
                }
            });
        });
    }

    static findAll(table) {
        return new Promise (function(resolve, reject) {
            const query = `SELECT * FROM ${table}`;

            db.all(query, function(err, rows) {
                if (err) {
                    reject({
                        msg:`Error getting all datas`,
                        err: err});
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static findOne(table, options) {
        return new Promise (function(resolve, reject) {
            const stmt = db.prepare(`SELECT * FROM ${table} WHERE ${options.fiend} = ?`);

            stmt.get(options.value, function(err, row) {
                if (err) {
                    reject({
                        msg: `Error getting data ${options.value}`,
                        err: err });
                } else {
                    resolve(row);
                }
            });
        });
    }

    static delete(table, options) {
        return new Promise(function(resolve, reject) {
            const stmt = db.prepare(`DELETE FROM ${table} WHERE ${options.field} = ?`);

            stmt.run(options.value, function(err) {
                if(err) {
                    reject({
                        msg:`Error deleting data`,
                        err:err});
                } else {
                    resolve(options);
                }
            });
        });
    }
}

module.exports = Model;