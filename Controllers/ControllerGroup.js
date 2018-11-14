const Group = require('../Models/Group')
const View = require('../Views/View')
const Model = require('../Models/Model')

class ControllerGroup {

    static create (option) {
        Group.create({
            name: option[1]
        }, option[0])
            .then((data) => {
                View.successCreate(option[1])
            })
            .catch((err) => {
                View.errDisplay(err)
            })
    }

}

module.exports = ControllerGroup