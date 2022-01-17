function() {
  var elem = document.createElement("div");

  assert( H.test.cssProp( elem, "wordWrap", true ), "wordWrap supported" );
}