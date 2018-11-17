const Controller = require('./controllers/controller.js')

const argv = process.argv.slice(2)

let table = argv[0]
let command = argv[1]
let data = argv.slice(2)



Controller.execute(table, command, data)
