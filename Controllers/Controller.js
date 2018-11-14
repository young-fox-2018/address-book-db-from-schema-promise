let View = require(`../Views/View`)
let Contacts = require(`../Models/contacts`)
let Groups = require(`../Models/groups`)
let ContactGroup = require(`../Models/contact-group`)

class Controller {

    static execute(args1, args2, options) {
        switch (args1) {
            case "Contacts":
                if (args2 == "create") {
                    Contacts.insert("contacts", {
                        "nama": options[0],
                        "nama_perusahaan": options[1],
                        "nomor_telepon": options[2],
                        "email": options[3]
                    }).then(data => {
                        console.log(data, '===')
                        View.viewData(data)
                    })
                }
                break;

            case "Groups":
                if (args2 == "create") {
                    Groups.insert("Groups", {
                        "nama": options[0]
                    }).then(data => {
                        View.viewData(data)
                    })
                }
                break;

            case "Contactgroup":
                
                if (args2 == "create") {
                    Contacts.findOne(options[0], "Contacts")
                        .then((data) => {
                            console.log(" data ===> ",data)
                            if (data === null) {
                                throw `udah ada`
                            } else {
                                console.log("jalan kesini ")
                                return Groups.findOne(options[1], "Groups")
                            }  
                        }).then((data1) => {
                            
                        }).catch(function (error) {
                            console.log(error);
                        });

                }
        }
    }
}

class ControllerContacts {
    static create(nama, namaperusahaan, nomortelepon, email) {
        Contacts.create(nama, namaperusahaan, nomortelepon, email, function (err, data) {
            if (err) {
                View.viewError(err)
            } else {
                View.viewData(data)
            }
        })
    }
}

class ControllerGroups {

}

module.exports = Controller