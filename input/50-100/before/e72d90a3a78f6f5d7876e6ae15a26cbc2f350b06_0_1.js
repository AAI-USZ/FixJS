function setFromWithCurrentPosition(pos) {
  // make sure we are not already editing the field
  if($("#from-input").is(":focus")) {
    return;
  }
  var c = pos.coords;
  $("#from-input").val(c.latitude.toFixed(4)+", "+c.longitude.toFixed(4));
}