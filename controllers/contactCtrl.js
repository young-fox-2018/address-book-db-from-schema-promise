const Contact = require('../models/contact')

class ContactController {
    static findAll() {
        Contact.findAll()
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    static findOne(params) {
        Contact.findOne({
            [params[0]]: params[1]
        }).then((result) => {
            if(result) console.log(result)
            else console.log("Data not found")
        }).catch((err) => {
            console.log(err)
        })
    }
    static create(params) {
        Contact.create({
            name: params[0],
            company: params[1],
            phone: params[2],
            email: params[3]
        }).then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err)
        })
    }
    static update(params) {
        Contact.findOne({[params[0]]: params[1]})
            .then(result => {
                if (result) {
                    // console.log(result.id)
                    return Contact.update(result.id, {[params[0]]: params[2]})
                } else {
                    console.log("Data not found!")
                }
            })
            .then(result => {
                console.log("Data updated!")
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = ContactController