
const argv = process.argv
const ContactController = require('./controllers/contactController')
const GroupController = require('./controllers/groupController')
const ContactGroupController = require('./controllers/contactGroupController')

switch (argv[2]) {
    case 'contacts':
        switch (argv[3]) {
            case 'createTable':
                ContactController.createTable()
                break;
            case 'add':
                ContactController.add(argv[4], argv[5], argv[6], argv[7])
                break;
            case 'addDummy':
                ContactController.readDummyData()
                break;
            case 'find':
                ContactController.findOne(argv[4], argv[5])
                break;
            case 'update':
                ContactController.update(argv[4], argv[5], argv[6], argv[7])
                break;
            case 'delete':
                ContactController.delete(argv[4], argv[5])
                break;
        }
        break;
    case 'groups':
        switch (argv[3]) {
            case 'createTable':
                GroupController.createTable()
                break;
            case 'addDummy':
                GroupController.readDummyData()
                break;
            case 'add':
                GroupController.add(argv[4])
                break;
            case 'find':
                GroupController.findOne(argv[4], argv[5])
                break;
            case 'update':
                GroupController.update(argv[4], argv[5], argv[6], argv[7])
                break;
            case 'delete':
                GroupController.delete(argv[4], argv[5])
                break;
        }
    case 'contactgroup':
        switch (argv[3]) {
            case 'createTable':
                ContactGroupController.createTable()
                break;
            case 'addDummy':
                ContactGroupController.readDummyData()
                break;
            case 'add':
                ContactGroupController.add(argv[4], argv[5])
                break;
            case 'showContactGroup':
                ContactGroupController.showContactGroup(argv[4])
                break
        }

}