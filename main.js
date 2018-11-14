let Controller = require(`./Controllers/Controller`)
let argv = process.argv.slice(2)
let options = argv.slice(2)

Controller.execute(argv[0], argv[1], options)
