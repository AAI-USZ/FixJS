function attrOnBlur(AThis) {
  console.log('attrOnBlur('+AThis.id+')');
  document.getElementById('attributes').setAttribute('class','');
  attributes_focused = false;
}