const Model = require("../models/model")
const Contact = require("../models/contact")
const ContactGroup = require("../models/contact-group")
const Group = require("../models/group")
const View = require("../views/view")

class Controller {
    static add(param, param1, param2, param3, param4) {
        if (param === "contact") {
            Contact.addData(param1, param2, param3, param4)
                .then((total) => {
                    View.displayData("Data berhasi disimpan")
                })
                .catch((err) => {
                    View.displayData(err)
                })
        }
        else if (param === "group") {
            Group.addData(param1)
                .then(() => {
                    View.displayData("Data berhasi disimpan")
                })
                .catch((err) => {
                    View.displayData(err)
                })
        }
        else if (param === "contactGroup") {
            ContactGroup.addData(param1, param2)
                .then(() => {
                    View.displayData("Data berhasi disimpan")
                })
                .catch((err) => {
                    View.displayData(err)
                })
        }
        else {
            View.displayErr("salah memasukan data")
        }
    }
    static update(table, column, updateData, param, data) {
        if (table === "contact") {
            Contact.updateData(column, updateData, param, data)
                .then(() => {
                    View.displayData("Data berhasi diupdate")
                })
                .catch((err) => {
                    View.displayData(err)
                })
        }
        else if (table === "group") {
            Group.updateData(column, updateData, param, data)
                .then(() => {
                    View.displayData("Data berhasi diupdate")
                })
                .catch((err) => {
                    View.displayData(err)
                })
        }

        else if (table === "contactGroup") {
            ContactGroup.updateData(column, updateData, param, data)
                .then(() => {
                    View.displayData("Data berhasi diupdate")
                })
                .catch((err) => {
                    View.displayData(err)
                })
        }
        else {
            View.displayErr("salah memasukan data")
        }
    }

    static delete(table, column, data) {
        if (table === "contact") {
            Contact.deleteData(column, data)
                .then(() => {
                    View.displayData("Data berhasi dihapus")
                })
                .catch((err) => {
                    View.displayData(err)
                })
        }
        else if (table === "group") {
            Group.deleteData(column, data)
                .then(() => {
                    View.displayData("Data berhasi dihapus")
                })
                .catch((err) => {
                    View.displayData(err)
                })
        }
        else if (table === "contactGroup") {
            ContactGroup.deleteData(column, data)
                .then(() => {
                    View.displayData("Data berhasi dihapus")
                })
                .catch((err) => {
                    View.displayData(err)
                })
        }
        else {
            View.displayErr("salah memasukan data")
        }
    }

    static showAll(param) {
        if (param === "contact") {
            Contact.AllData()
                .then((data) => {
                    View.displayData(data)
                })
                .catch((err) => {
                    View.displayData(err)
                })
        }
        if (param === "group") {
            Group.AllData()
                .then((data) => {
                    View.displayData(data)
                })
                .catch((err) => {
                    View.displayData(err)
                })
        }
        else {
            View.displayErr("salah memasukan data")
        }
    }
}
module.exports = Controller