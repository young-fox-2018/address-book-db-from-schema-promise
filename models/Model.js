const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./address_book.db')

class Model{
    static create(table, options){
        return new Promise((resolve,reject) => {
            let headerValue = ``
            
            let header = Object.keys(options).join(",")
            // console.log(header,"ini header")
            for(let key in options){
              if(typeof options[key] === 'number'){
                headerValue += `${options[key]},`
              } else {
                headerValue += `"${options[key]}",`
              }
            }
            // console.log(headerValue.slice(0,-1),"ini header value")
            // console.log(table, "ini tabel nya")
            let qInsert = `INSERT INTO ${table}(${header})
                            VALUES(${headerValue.slice(0,-1)})
                            `
            // console.log(qInsert)
            db.run(qInsert, function(err){
            if(err){
                reject(err)
            } else {
                resolve(null)
            }
            })
        })
        
    }

    static findOne(table,options){
        return new Promise((resolve,reject)=>{
            let qFind = ``
            for(let key in options){
              if(typeof options[key] === 'number'){
                qFind += `${key} = ${options[key]} AND `
              } else {
                qFind += `${key} = "${options[key]}" AND `
              }
            }
            db.get(`SELECT * FROM ${table} WHERE ${qFind.slice(0,-4)}`,function(err,data){      
              if(err){
                reject(err)
              } else {
                if(data){
                  resolve(data)
                } else {
                  resolve(null)
                }
              }
            })
        })
        
    }

    static findAll(field,table){
        return new Promise((resolve,reject)=>{
            db.all(`SELECT ${field} FROM ${table}`,function(err,data){
                if(err){
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    static update(table,id,options){
        return new Promise((resolve,reject)=>{
            let qFind = ``
            for(let key in options){
              if(typeof options[key] === 'number'){
                qFind += `${key} = ${options[key]}`
              } else {
                qFind += `${key} = "${options[key]}"`
              }
            }
            db.run(`UPDATE ${table} SET ${qFind} WHERE id = ${id}`,function(err){
              if(err){
                reject(err)
              } else {
                resolve(null)
              }
            })
        })
    }

    static delete(table,options){
        // console.log(options)
        return new Promise((resolve,reject)=>{
            let qFind = ``
            for(let key in options){
              if(typeof options[key] === 'number'){
                qFind += `${key} = ${options[key]} AND `
              } else {
                qFind += `${key} = "${options[key]}" AND `
              }
            }
    
            let query = `DELETE FROM ${table} WHERE ${qFind.slice(0,-4)}`
            // console.log(query)
            db.run(query, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(null)
                }
            });
        })
    }
}

module.exports = Model