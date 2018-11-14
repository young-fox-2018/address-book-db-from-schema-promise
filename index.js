
const argv = process.argv.slice(2)
const Controller = require("./controllers/controller")
switch (argv[0]) {
    case "add":
        Controller.add(argv[1], argv[2], argv[3], argv[4], argv[5])
        break;
    case "update":
        Controller.update(argv[1], argv[2], argv[3], argv[4], argv[5])
        break;
    case "delete":
        Controller.delete(argv[1], argv[2], argv[3], argv[4], argv[5])
        break;
    case "showAll":
        Controller.showAll(argv[1])
        break;
    case "seeder":
        Controller.seeder()
        break;
    default:
        console.log("Selamat Datang");
        break;
}