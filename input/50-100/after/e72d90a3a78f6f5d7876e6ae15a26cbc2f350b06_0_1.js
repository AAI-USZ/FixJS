function setFromWithCurrentPosition(pos) {
  // make sure we are not already editing the field
  // testing focus isn't quite right - instead just see if there is already 
  // a value put in there
  if($("#from-input").val()) {
    return;
  }
  var c = pos.coords;
  $("#from-input").val(c.latitude.toFixed(4)+", "+c.longitude.toFixed(4));
}