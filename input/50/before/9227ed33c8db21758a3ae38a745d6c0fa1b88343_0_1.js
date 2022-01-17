function() {
  var elem = document.createElement("div");

  assert( H.test.cssProp( elem, "textShadow" ), "textShadow supported" );
}