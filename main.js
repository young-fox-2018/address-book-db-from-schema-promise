let ContactController = require('./controllers/contactCtrl')
const inp = process.argv.slice(2)

switch (inp[0]) {
    case "contact":
        switch (inp[1]) {
            case 'findAll':
                ContactController.findAll()
                break;
            case 'findOne':
                ContactController.findOne(inp.slice(2))
                break;
            case 'create':
                ContactController.create(inp.slice(2))
                break;
            case 'update':
                ContactController.update(inp.slice(2))
                break;
            case 'delete':
                ContactController.delete(inp.slice(2))
                break;
            case 'showContact':
                ContactController.showContact()
                break;
            default:
                break;
        }
        break;
    case "group":
        switch (inp[1]) {
            case 'findAll':
                GroupController.findAll()
                break;
            case 'findOne':
                GroupController.findOne(inp.slice(2))
                break;
            case 'create':
                GroupController.create(inp.slice(2))
                break;
            case 'update':
                GroupController.update(inp.slice(2))
                break;
            case 'delete':
                GroupController.delete(inp.slice(2))
                break;
            default:
                break;
        }
        break;
    case "contactGroup":
        switch (inp[1]) {
            case 'findAll':
                contactGroupController.findAll()
                break;
            case 'findOne':
                contactGroupController.findOne(inp.slice(2))
                break;
            case 'create':
                contactGroupController.create(inp.slice(2))
                break;
            case 'update':
                contactGroupController.update(inp.slice(2))
                break;
            case 'delete':
                contactGroupController.delete(inp.slice(2))
                break;
            default:
                break;
        }
        break;

    default: console.log('input salah')
        break;
}
