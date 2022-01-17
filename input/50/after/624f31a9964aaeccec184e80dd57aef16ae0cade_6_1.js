function(){
    var tb = editor.find(".toolbar");
    ok(tb.find("a.save").is(":visible"), "save button should be visible");
    ok(tb.find("a.close").is(":visible"), "close button should be visible");
  }