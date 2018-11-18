class View {

    static help() {
        console.log(`Address Book Beta Version`);
        console.log(`=========================`);
        console.log(`node setup ==> Create tables`);
        console.log(`node seed_data ==> Generate dummy data`);
        console.log(`node main show (contacts/groups)`);
        console.log(`node main add (contact/group) <value> <value> <value>`);
        console.log(`node main update contact id <field> <value>`);
        console.log(`node main update group id <group_name>`);
        console.log(`node main delete (contact/group) id <value>`);
        console.log(`node main find (contact/group) <field> <value>`);
        console.log(`node main invite (group_name) <fieldContact> <valueContact>`);
    }

    static displayError(err) {
        console.log(err);
    }

    static displayAll(datas) {
        console.log(datas);
    }

    static displaySuccess(msg) {
        console.log(msg);
    }
}

module.exports = View;