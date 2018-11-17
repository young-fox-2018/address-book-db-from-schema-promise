const ContactGroup = require ('../models/contactgroupmodel.js')
const View = require ('../view.js')

class ControllerContactGroup {
  
  static create(table, data) {
    ContactGroup.create(table, data)
      .then(function(data) {
        View.success(`sukses menambahkan ${data[0]} kedalam ${data[1]}`)
      })
      .catch(function(err) {
        View.error(err)
      })
  }

  static read(table, data) {
    ContactGroup.read(table, data)
      .then(function(data) {
        View.success(JSON.stringify(data))
      })
      .catch(function(err) {
        View.error(err)
      })
  }
}

module.exports = ControllerContactGroup