const Views = require('../views/View');
const Contact = require('../models/Contact');
const Group = require('../models/Group');
const ContactGroup = require('../models/ContactGroup');

class Controller {
    static execute(args) {
        const command = args[0];
        const data = args.slice(1);

        switch (command) {
            case 'show': Controller.show(data); break;
            case 'add' : Controller.add(data); break;
            case 'update': Controller.update(data); break;
            case 'delete': Controller.delete(data); break;
            case 'find': Controller.find(data); break;
            case 'invite': Controller.invite(data); break;            
            default: Views.help(); break;
        }
    }

    static show(data) {
        if(data[0].toLowerCase() === 'contacts') {
            Contact.findAll()
            .then(rows => {
                Views.displayAll(rows);
            })
            .catch(err => {
                Views.displayError(err);
            });
        } else if (data[0].toLowerCase() === 'groups'){
            Group.findAll()
            .then(rows => {
                Views.displayAll(rows);
            })
            .catch(err => {
                Views.displayError(err);
            });
        }
    }

    static add(data) {
        if(data[0].toLowerCase() === 'contact') {
            if (data.length !== 5) {
                Views.displayError(`Please input data name, company, phone, and email!`);
            } else {
                Contact.addContact({
                    name: data[1],
                    company: data[2],
                    phone: data[3],
                    email: data[4]})
                .then(data => {
                    Views.displaySuccess(`Contact added to database!`);
                })
                .catch(err => {
                    Views.displayError(err);
                })
            }
        } else if(data[0].toLowerCase() === 'group') {
            if (data.length !== 2) {
                Views.displayError(`Please input group name`);
            } else {
                Group.addGroup({group_name: data[1]})
                .then(data => {
                    Views.displaySuccess(`Group ${data.group_name} added to database!`);
                })
                .catch(err => {
                    Views.displayError(err);
                });
            }
        }
    }

    static update(data) {
        if(data[0].toLowerCase() === 'contact') {
            const id = Number(data[1]);
            data = data.slice(2);

            let options = {}
            for (let i = 0; i < data.length; i+= 2) {
                options[data[i]] = data[i+1];
            }

            Contact.update(id, options)
            .then(change => {
                if(change.changes === 0) {
                    Views.displayError(`Contact not found!`);
                } else {
                    Views.displaySuccess(`Contact updated!`);
                }
            })
            .catch(err => {
                Views.displayError(err);
            });
        } else if(data[0].toLowerCase() === 'group') {
            const id = Number(data[1]);
            data = data.slice(2);
            let options = {group_name: data[0]};
            
            Group.update(id, options)
            .then( data => {
                if (data.changes === 0) {
                    Views.displayError(`Group not found!`);
                } else {
                    Views.displaySuccess(`Group updated!`);
                }
            })
            .catch(err => {
                Views.displayError(err);
            });
        }
    }

    static delete(data) {
        if(data[0].toLowerCase() === 'contact') {
            const options = {field: data[1], value: data[2]};

            Contact.findOne(options)
            .then(row => {
                if(row) {
                    Contact.delete(options)
                    .then(data => {
                        return ContactGroup.delete({field: 'contact_id', value: options.value});
                    })
                    .then(data => {
                        Views.displaySuccess(`Contact deleted!`);
                    })
                }
            })
            .catch(err => {
                Views.displayError(err);
            })
        } else if(data[0].toLowerCase() === 'group') {
            const options = {
                field: 'id', 
                value: data[2]};

            Group.findOne(options)
            .then(row => {
                if(row) {
                    Group.delete(options)
                    .then(data => {
                        return ContactGroup.delete({field: 'group_id', value: options.value});
                    })
                    .then(data => {
                        Views.displaySuccess(`Group deleted!`);
                    })
                } else {
                    Views.displayError(`The group not found!`);
                }
            })
        }
    }

    static find(data) {
        if(data[0].toLowerCase() === 'contact') {
            const options = {
                field: data[1],
                value: data[2]};

            Contact.findOne(options)
            .then(row => {
                Views.displayAll(row);
            })
            .catch(err => {
                Views.displayError(err);
            });
        } else if(data[0].toLowerCase() === 'group') {
            let options = {
                field: data[1], 
                value: data[2]};

            Group.findOne(options)
            .then(data => {
                Views.displayAll(data);
            })
            .catch(err => {
                Views.displayError(err);
            })
        }
    }

    static invite(data) {
        const group = data[0];
        const options = {field: data[1], value: data[2]};

        Group.findOne({field: 'group_name', value: group})
        .then(group => {            
            Contact.findOne(options)
            .then(contact => {                
                return ContactGroup.create(
                    {contact_id: contact.id,
                    group_id: group.id})            
            })
            .then(data => {
                Views.displaySuccess(`Member ${options.value} joined group ${group.group_name}`);
            })
            .catch(err => {
                Views.displayError(err);
            })
        })
        .catch(err => {
            Views.displayError(err);
        })
    }
}

module.exports = Controller