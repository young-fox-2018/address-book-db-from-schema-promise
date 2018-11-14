const argv = process.argv.slice(2)
const Controller = require('./controllers/Controller')

switch (argv[0]) {
    case 'create':
        Controller.create(argv[1], argv.slice(2))
        break;
    case 'show':
        Controller.show(argv[1], argv.slice(2))
        break;
    case 'update':
        
        break;  
    case 'delete':

        break
    case 'addGroup':
        Controller.addGroup(argv[1], argv[2])
        break
    default:

        break;
}