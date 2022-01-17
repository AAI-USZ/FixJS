function() {
    setTimeout($("div.layer1").addClass("active"), 2000);
    return setTimeout($("div.layer2").addClass("active"), 4000);
  }