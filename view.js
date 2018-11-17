class View {
  static success(data){
    return console.log(data);
  }

  static error(err) {
    return console.log(err);
  }
}

module.exports = View