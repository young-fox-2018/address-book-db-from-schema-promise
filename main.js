const argv = process.argv.slice(2)
const command = argv[0]
const option = argv.slice(1)

const ControllerContacts = require('./Controllers/ControllerContacts')
const ControllerGroups = require('./Controllers/ControllerGroup')
const ControllerContactGroup  = require('./Controllers/ControllerContactGroup')

switch (command) {
    case 'create':
        if(option[0] === 'contacts') {
            ControllerContacts.create(option)
        } else if(option[0] === 'groups') {
            ControllerGroups.create(option)
        } else if(option[0] === 'contact_group') {
            ControllerContactGroup.create(option)
        }
        break;
    
    case 'readOne':
        if(option[0] === 'contacts') {
            ControllerContacts.readOne(option)
        }
}
