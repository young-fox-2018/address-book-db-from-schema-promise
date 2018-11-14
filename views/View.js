
class View{
    static displayError(err){
        console.log(err)
    }

    static displayData(data){
        console.log(data)
    }

    static displayHelp(){
        console.log("-----help------")
        console.log("node main.js help")
        console.log("node main.js create Contact <contact_name> <company> <phone_number> <mail>")
        console.log("node main.js create Group <group_name>")
        console.log("node main.js invite <contact_email> <group_name>")
        console.log("node main.js find <Contact/Group> <field> <value>")
        console.log("node main.js show Group")
        console.log("node main.js show Contact")
        console.log("node main.js delete Contact <email>")
        console.log("node main.js delete Group <group_name>")
    }
}

module.exports = View