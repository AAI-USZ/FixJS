function(){
    var string = "* item1\n* item2";
    textile.set(string)
      .select("item1")
      .disabled("alignCenter")
      .disabled("alignRight")
      .disabled("alignLeft")
      .click(".alignCenter")
      .equal(string);
  }