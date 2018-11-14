const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./address_book.db')

const Model = require("./Model.js")

class Group extends Model{
    
}

module.exports = Group