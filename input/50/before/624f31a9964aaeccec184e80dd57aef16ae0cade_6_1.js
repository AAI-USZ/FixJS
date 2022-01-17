function(){
    var ta = editor.find(".toolbar");
    ok(ta.find("a.save").is(":visible"), "save button should be visible");
    ok(ta.find("a.close").is(":visible"), "close button should be visible");
  }