const argv = process.argv.slice(2)
const Controller = require("./controllers/Controller.js")
const View = require("./views/View.js")

const command = argv[0]
const options = argv.slice(1)


switch (command) {
    case "create":
        Controller.create(options)
        break;
    case "show":
        Controller.show(options)
        break;
    case "invite":
        
        break;
    case "find":
        Controller.find(options)
        break;
    case "update":
        Controller.update(options)
        break;
    case "delete":
        Controller.delete(options)
        break;
    case "help":
        View.displayHelp()
        break;
    default:
        View.displayHelp()
        break;
}