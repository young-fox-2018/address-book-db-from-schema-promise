const ControllerContact = require ('./contactcontroller.js')
const ControllerGroup = require ('./groupcontroller.js')
const ControllerContactGroup = require ('./contactgroupcontroller.js')

class Controller {
  static execute(table, command, data) {
    switch (table) {

      case "contacts":
        switch (command) {
          case "create":
            ControllerContact.create(table, data)
            break;

            case "read":
              ControllerContact.read(table, data)
              break;

            case "update":
              ControllerContact.update(table, data)
              break;

            case "delete":
              ControllerContact.delete(table, data)
              break;

          default: Controller.help()
        }
        break;

      case "groups":
        switch (command) {
          case "create":
            ControllerGroup.create(table, data)
            break;

            case "read":
              ControllerGroup.read(table, data)
              break;

            case "update":
              ControllerGroup.update(table, data)
              break;

            case "delete":
              ControllerGroup.delete(table, data)
              break;

          default: Controller.help()
        }
        break;

      case "contactgroup":
          switch (command) {
            case "create":
              ControllerContactGroup.create(table, data)
              break;

              case "read":
                ControllerContactGroup.read(table, data)
                break;

              // case "update":
              //   ControllerContactGroup.update(data)
              //   break;
              //
              // case "delete":
              //   ControllerContactGroup.delete(data)
              //   break;

            default: Controller.help()
          }
        break;

      default: Controller.help()

    }
  }

  static help() {
    console.log(`gunakan format berikut untuk menggunakan aplikasi ini
      <namatabel> <fitur> <format>

      silahkan pilih nama tabel -- "contacts" atau "group"
      silahkan pilih fitur -- "create", "read", "update", "delete"

      untuk format penggunaan adalah sebagai berikut :

      create contact --> contacts create <name> <company> <phone_number> <email>
      contoh --> contacts create patria hacktiv8 0812345678 patria@hacktiv8.com

      untuk sisa fitur yang lain silahkan tanya saya :)`);
  }
}

module.exports = Controller