function() {
  var elem = document.createElement("div");

  assert( H.test.cssProp( elem, "wordSpacing", true ), "wordSpacing supported" );
}