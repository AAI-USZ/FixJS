function() {
  var elem = document.createElement("div");

  assert( H.test.cssProp( elem, "wordBreak", true ), "wordBreak supported" );
}