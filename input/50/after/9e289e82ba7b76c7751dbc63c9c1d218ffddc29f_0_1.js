function attrOnFocus(AThis) {
  console.log('attrOnFocus('+AThis.id+')');
  document.getElementById('attributes').setAttribute('class','focus');
  attributes_focused = true;
/*
  focused_input_old = focused_input;
  focused_input = AThis;
  focused_input_no_del = AThis; // this is not nulled for "DEL" workaround
*/
}