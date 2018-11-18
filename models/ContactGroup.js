const Model = require('./Model');
const db = require('./Database');

class ContactGroup {
    static create(options) {
        return new Promise(function(resolve, reject) {
            Model.create('ContactGroup', options)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
        });
    }

    static delete(options) {
        return new Promise(function(resolve, reject) {
            Model.delete('ContactGroup', options)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })            
        });
    }
}

module.exports = ContactGroup;