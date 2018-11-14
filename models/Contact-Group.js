const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./address_book.db')

const Model = require("./Model.js")

class ContactGroup extends Model{

    static showContact(){
        return new Promise((resolve,reject)=>{
            let query = `
                        SELECT name,company,phone_number,email,GROUP_CONCAT(group_name) AS groups
                        FROM ((Contacts
                        LEFT JOIN ContactsGroups ON Contacts.id = ContactsGroups.contactId)
                        LEFT JOIN Groups ON ContactsGroups.groupId = Groups.id)
                        GROUP BY name
                        `
            db.all(query, function(err,data){
                if(err){
                    reject(err)
                } else {
                    resolve(data)
                }
            })    
        })
    }
}

module.exports = ContactGroup