const Model = require('./Model');
const db = require('../models/Database');

class Contact {
    static addContact(data) {
        return new Promise(function(resolve, reject) {
            Model.create('Contacts', data)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    static findAll() {
        return new Promise( function(resolve, reject) {
            Model.findAll('Contacts')
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
        });
    }
    
    static update(id, options) {
        return new Promise( function(resolve, reject) {
            Model.update('Contacts', id, options)
            .then(change => {
                resolve(change);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    static delete(options) {
        return new Promise( function(resolve, reject) {
            Model.delete('Contacts', options)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
        });
    }

    static findOne(options) {
        return new Promise( function(resolve, reject) {
            const stmt = db.prepare(`SELECT Contacts.id, name, company, phone, 
                                            email, group_concat(group_name) AS Grup
                                    FROM Contacts 
                                    LEFT JOIN ContactGroup ON contact_id = Contacts.id 
                                    LEFT JOIN Groups ON group_id = Groups.id
                                    WHERE Contacts.${options.field} = ?
                                    GROUP BY Contacts.id`);
    
            stmt.get(options.value, function(err, row) {
                if (err) {
                    reject({message: `Error getting data ${options.value}`, err: err});
                } else {                         
                    resolve(row);
                }
            });        
        })
    }
}

module.exports = Contact