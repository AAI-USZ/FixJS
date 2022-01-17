function completer () {
  return new Completion(
    {
      global: this.context,
      evaluate: function (str) {
        return evalcx(str, this.context, "repl");
      }.bind(this)
    });
}