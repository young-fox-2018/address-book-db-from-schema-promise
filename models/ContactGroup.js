const Model = require('./Model')
const db = require('../database/db')

class ContactGroup extends Model{
    static add (email, group) {
        return new Promise((resolve, reject) => {
            if (email && group) {

            
                let idContact = 0
                let idGroup = 0
                Model.findOne('contacts', {
                    field: 'email',
                    value: email
                })
                    .then((data) => {
                        if (data) {
                            idContact = data.id
                            return Model.findOne('groups', {
                                field: 'nama',
                                value: group
                            })
                        } else {
                            reject({
                                message: `email ${email} tidak ditemukan`
                            })
                        }
                        
                    })
                    .then((data) => {
                        if (data) {
                            idGroup = data.id
                        
                            return ContactGroup.findOne(idContact, idGroup)    
                        } else {
                            reject({
                                message: `group ${group} tidak ditemukan`
                            })
                        }
                        
                    })
                    .then((data) => {
                        // console.log(data)
                        if (data) {
                            reject({
                                message : `${email} sudah terdaftar pada group ${group}`
                            })
                        } else {
                            return Model.insertData('contact_group', [idContact, idGroup])
                        }
                    })
                    .then(() => {
                        resolve(`${email} berhasil di daftarkan digroup ${group}`)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            
            } else {
                reject(`
                format addGroup salah.
                addGroup <email> <nama group>
                `)
            }
        }) 
    }

    static findOne (idContact, idGroup) {
        return new Promise((resolve, reject) => {
            let query = 
            `
            select * from contact_group
            where contactId = ${idContact}
            and groupId = ${idGroup}
            `

            db.get(query, function(err, data) {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        }) 
    }
}


module.exports = ContactGroup