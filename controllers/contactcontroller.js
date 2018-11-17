const Contact = require ('../models/contactmodel.js')
const View = require ('../view.js')

class ControllerContact {
  static create(table, data) {
    Contact.create(table, data)
      .then(function(data) {
        View.success(`sukses menyimpan kontak ${data.name}`)
      })
      .catch(function(err) {
        View.error(err)
      })
  }

  static read(table, data) {
    Contact.read(table, data)
      .then(function(data) {
        View.success(JSON.stringify(data))
      })
      .catch(function(err) {
        View.error(err)
      })
  }

  static update(table, data) {
    Contact.update(table, data)
      .then(function(data) {
        if (data.changes === 0) {
          View.success(`update gagal, ada sesuatu yang salah`)
        }
        else {
          View.success(`berhasil update data`)
        }
      })
      .catch(function(err) {
        View.error(err)
      })
  }

  static delete(table, data) {
    Contact.delete(table, data)
      .then(function(data) {
        if (data.changes != 0) {
          View.success(`berhasil menghapus contact`)
        }
        else {
          View.success(`gagal menghapus contact`)
        }
      })
      .catch(function(err) {
        View.error(err)
      })
  }
}

module.exports = ControllerContact