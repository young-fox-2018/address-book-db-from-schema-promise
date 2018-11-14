const Model = require('./Model')

class Groups extends Model {

    static create (table, params) {
        return new Promise((resolve, reject) => {
            if (params[0]) {
                Model.findOne(table, {
                    field: 'nama',
                    value: params[0]
                })
                    .then((data) => {
                        if (data) {
                            reject({
                                message: `nama group ${params[0]} sudah digunakan`
                            })
                        } else {
                            Model.insertData(table, params)
                                .then(() => {
                                    resolve(`berhasil membuat group ${params[0]}`)
                                })
                                .catch((err) => {
                                    reject(err)
                                })
                        }
                    })
                    .catch((err) => {
                        reject(err)
                    })
            } else {
                reject(
                    `
                    format create groups salah.
                    create groups <nama group>
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
                select a.nama as nama_group, c.nama nama_contact, c.nomor_tlp, c.email from groups as a
                inner join 
                contact_group as b on a.id = b.groupId
                inner join contacts as c on b.contactId = c.id
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
                select a.nama as nama_group, c.nama nama_contact, c.nomor_tlp, c.email from groups as a
                inner join 
                contact_group as b on a.id = b.groupId
                inner join contacts as c on b.contactId = c.id
                `
                
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

module.exports = Groups