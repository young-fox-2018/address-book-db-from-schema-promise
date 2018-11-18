const Controller = require('./controllers/Controller');
const args = process.argv.slice(2);

Controller.execute(args);