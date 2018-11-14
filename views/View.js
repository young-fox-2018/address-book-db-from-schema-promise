class View {
    static displayError (err) {
        console.log('==========================')
        console.log('Terjadi error pada sistem')
        console.log('==========================')

        console.log(err)

    } 

    static displayMsg (msg) {
        console.log(msg)
    }
}


module.exports = View