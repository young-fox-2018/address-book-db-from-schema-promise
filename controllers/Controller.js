const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./address_book.db')
const Group = require("../models/Group.js")
const Contact = require("../models/Contact.js")
const View = require("../views/View.js")
const ContactGroup = require("../models/Contact-Group.js")

class Controller{
    static create(options){
        if(options[0] == 'Contact'){
            let obj = {
                name: options[1],
                company: options[2],
                phone_number: options[3],
                email: options[4]
            }
            let option = {
                email: options[4]
            }
            Contact.findOne('Contacts',option)
            .then(data=>{
                if(data){
                    View.displayError("data email yang didaftarkan sudah ada")
                } else {
                    Contact.create('Contacts',obj)
                    .then(data => {
                        View.displayData(`Berhasil membuat contact`)
                    })
                    .catch(err => {
                        View.displayError(err)
                    })
                }
            })
            .catch(err => {
                View.displayError(err)
            })
        } else if (options[0] == "Group"){
            let obj = {
                group_name: options[1]
            }

            Group.create('Groups',obj)
            .then(data => {
                View.displayData(`Berhasil membuat group ${obj.group_name}`)
            })
            .catch(err => {
                View.displayError(err)
            })
        } 
    }

    static find(options){
        let obj = {
            [options[1]]: options[2]
        }
        if(options[0] === "Contact"){
            Contact
                .findOne("Contacts",obj)
                .then(data=>{
                		if(data){
                    	View.displayData(data)
                		} 	else {
                    	View.displayError("data tidak ditemukan")
                  	}
                	})
                .catch(err=>{
                	View.displayError(err)
            		})
        } else if(options[0] === "Group"){
            Contact.findOne("Groups",obj)
            .then(data=>{
                if(data){
                    View.displayData(data)
                } else {
                    View.displayError("data tidak ditemukan")
                }
            })
            .catch(err=>{
                View.displayError(err)
            })
        }
    }

    // static update(options){
		// 	let obj = {

		// 	}
    //   if(options[0] === "Contact"){
		// 		Contact.update()
		// 	} else if(options[0] === "Group"){

		// 	}
    // }

    static delete(options){
        if(options[0] === "Contact"){
            let options2 = {
                email: options[1]
            }
            Contact.findOne('Contacts',options2)
            .then(data=>{
                if(data){
                    let options3 = {
                        contactId : data.id
                    }
                    return ContactGroup.delete('ContactsGroups',options3)
                    .then(data=>{
                        View.displayData(`Berhasil update data di ContactsGroups`)
                        return Contact.delete('Contacts',options2)
                    .then(data=>{
                        View.displayData(`Berhasil delete data ${options2.email}`)
                    })
                    })
                } else {
                    View.displayError("data contact tidak ditemukan")
                }
            })
            .catch(err=>{
                View.displayError(err)
            })
            
        } else if(options[0] === "Group") {
            let options2 = {
                group_name: options[1]
            }

            Group.findOne('Groups',options2)
            .then(data=>{
                if(data){
                    let options3 = {
                        groupId : data.id
                    }
                    return ContactGroup.delete('ContactsGroups',options3)
                    .then(data=>{
                        View.displayData(`Berhasil update data di ContactsGroups`)
                        return Group.delete('Groups',options2)
                    .then(data=>{
                            View.displayData(`Berhasil delete group ${options2.group_name}`)
                        })
                    })
                } else {
                    View.displayError("data group tidak ditemukan")
                }
            })
            .catch(err=>{
                View.displayError(err)
            })
        }
    }

    static show(options){
        if (options[0] == "Contact"){
            ContactGroup.showContact()
            .then(data=>{
                View.displayData(data)
            })
            .catch(err=>{
                View.displayError(err)
            })

        } else if (options[0] == "Group"){
            Group.findAll('group_name','Groups')
            .then(data=>{
                View.displayData(data)
            })
            .catch(err=>{
                View.displayError(err)
            })
        }
    }

}

module.exports = Controller