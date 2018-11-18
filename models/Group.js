const Model = require('./Model');
const db = require('../models/Database');

class Groups {
    static addGroup(data) {
        return new Promise( function(resolve, reject) {
            Model.create('Groups', data)
            .then(data => {                
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    static update(id, options) {
        return new Promise (function(resolve, reject) {
            Model.update('Groups', id, options)
            .then(change => {
                resolve(change);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    static findAll() {
        return new Promise (function(resolve, reject) {
            Model.findAll('Groups')
            .then(rows => {
                resolve(rows);
            })
            .catch(err => {
                reject(err);
            })
        });
    }

    static findOne(options) {
        return new Promise (function(resolve, reject) {
            const stmt = db.prepare(`SELECT Groups.id, group_name, 
                                    group_concat(name) AS Members 
                                    FROM Groups 
                                    LEFT JOIN ContactGroup ON Groups.id = group_id
                                    LEFT JOIN Contacts ON contact_id = Contacts.id
                                    WHERE Groups.${options.field} = ?
                                    GROUP BY group_name`);
            stmt.get(options.value, function(err, row) {
                if (err) {
                    reject({message: `Error getting data ${options.value}`, err: err});
                } else {                         
                    resolve(row);
                }
            });
        });
    }

    static delete(options) {
        return new Promise( function(resolve, reject) {
            Model.delete('Groups', options)
            .then(data => {                
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
        });
    }
}

module.exports = Groups
