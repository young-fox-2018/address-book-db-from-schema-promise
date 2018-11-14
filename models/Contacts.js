const Model = require('./Model')

class Contacts extends Model{

    static validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    static createContact (table, params) {
        return new Promise((resolve, reject) => {

            if (params[0] != undefined && params[1] != undefined
                && params[3] != undefined && params[3]) {
                
                if (Contacts.validateEmail(params[3])) {
                    Model.findOne(table, {
                        field: 'email',
                        value: params[3]
                    })
                        .then((data) => {
                            if (data) {
                                reject({
                                    message: 'email telah digunakan'
                                })
                            } else {
                                return Model.insertData(table, params)
                            }
                        })
                        .then(() => {
                            resolve(`${params[0]} berhasil ditambahkan pada ${table}`)
                        })
                        .catch((err) => {
                            reject(err)
                        })
                } else {
                    reject({
                        message: 'email tidak valid'
                    })
                }

            } else {
                reject(
                    `
                    format create contacts salah.
                    create contacts <nama> <perusahaan> <nomor tlp> <email>
                    `
                )
            }
        })
    }

    static show (table, params) {
        return new Promise((resolve, reject) => {
            if (params[0] && params[1]) {
                let query = 
                `
                select a.nama as nama_contact, a.perusahaan, a.nomor_tlp, a.email, c.nama as nama_group 
                from ${table} as a
                inner join 
                contact_group as b on a.id = b.contactId
                inner join 
                groups as c on b.groupId = c.id
                where a.${params[0]} = '${params[1]}'
                `

                Model.getQuery(query)
                    .then((data) => {
                        resolve(data)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            } else {
                let query = 
                `
                select a.nama as nama_contact, a.perusahaan, a.nomor_tlp, a.email, c.nama as nama_group 
                from ${table} as a
                inner join 
                contact_group as b on a.id = b.contactId
                inner join 
                groups as c on b.groupId = c.id`
                
                Model.getQuery(query)
                    .then((data) => {
                        resolve(data)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            }
            
        })
    }

} 


module.exports = Contacts