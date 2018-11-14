const db = require('../database/db')

class Model {
    static insertData (table, params) {
        return new Promise((resolve, reject) => {
            let values = []
            params.forEach(element => {
                values.push('(?)')
            });

            let insertRecord = db.prepare(`INSERT INTO ${table} values (null,${values.join(',')})`)
            insertRecord.run(params)
            insertRecord.finalize(function(err){
                if (err) {
                    reject({
                        message: `error insert record table ${table}`,
                        err: err
                    })
                } else {
                    resolve()
                }
            })
        })
    }

    // static create(table, params) {
    //     return new Promise((resolve, reject) => {
    //         if (table === 'contacts') {
    //             let objContact = {
    //                 nama: params[0],
    //                 perusahaan: params[1],
    //                 nomor_tlp: params[2],
    //                 email: params[3]
    //             }

    //             if (params[0] != undefined && params[1] != undefined
    //                 && params[3] != undefined && params[3]) {

    //                     if (/^[0-9]{9,12}$/.test(+params[2])) {
    //                         let validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //                         if (validateEmail.test(String(params[3]).toLowerCase())) {
    //                             Model.findOne(table, {
    //                                 field: 'email',
    //                                 value: params[3]
    //                             })
    //                                 .then((data) => {
    //                                     if (data) {
    //                                         reject({
    //                                             message: 'email telah digunakan'
    //                                         })
    //                                     } else {
    //                                         return Model.insertData(table, params)
    //                                     }
    //                                 })
    //                                 .then(() => {
    //                                     resolve(`${params[0]} berhasil ditambahkan pada ${table}`)
    //                                 })
    //                                 .catch((err) => {
    //                                     reject(err)
    //                                 })
    //                         } else {
    //                             reject({
    //                                 message: 'email tidak valid'
    //                             })
    //                         }


    //                     } else {
    //                         reject({
    //                             message: 'nomor tlp tidak valid'
    //                         })
    //                     }
                        
    //             } else {
    //                 reject(
    //                     `
    //                     format create contacts salah.
    //                     create contacts <nama> <perusahaan> <nomor tlp> <email>
    //                     `
    //                 )
    //             }

                
    //         } else if (table === 'groups') {

    //         } else {
    //             reject({
    //                 message: 'table tidak ditemukan'
    //             })
    //         }
    //     })
    // }

    static findOne (table, params) {
        return new Promise((resolve, reject) => {
            let query = `
            select * from ${table}
            where ${params.field} = '${params.value}'
            `
            db.get(query, function(err, data){
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    static execQuery (query) {
        return new Promise((resolve, reject) => {
            db.run(function(err) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static getQuery (query) {
        return new Promise((resolve, reject) => {
            db.all(query, function(err, data){
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
}

module.exports = Model