const Group = require ('../models/groupmodel.js')
const View = require ('../view.js')

class ControllerGroup {
  static create(table, data) {
    Group.create(table, data)
      .then(function(data) {
        View.success(`sukses menyimpan group ${data.group_name}`)
      })
      .catch(function(err) {
        View.error(err)
      })
  }

  static read(table, data) {
    Group.read(table, data)
      .then(function(data) {
        View.success(JSON.stringify(data))
      })
      .catch(function(err) {
        View.error(err)
      })
  }

  static update(table, data) {
    Group.update(table, data)
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
    Group.delete(table, data)
      .then(function(data) {
        if (data.changes != 0) {
          View.success(`berhasil menghapus group`)
        }
        else {
          View.success(`gagal menghapus group`)
        }
      })
      .catch(function(err) {
        View.error(err)
      })
  }
}

module.exports = ControllerGroup