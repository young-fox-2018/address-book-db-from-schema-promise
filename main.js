const input = process.argv.slice(2)
const Controller = require('./Controllers/Controller')


switch (input[0]) {
    case 'add':
        switch (input[1]) {
            case 'contacts':
                Controller.addContact(input[1], input.slice(2))
                break;

            default:
                break;
        }

        break;

    default:
        break;
}