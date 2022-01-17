function attrOnKeyDown(AThis,AEvent) {
  // workaround for DEL to erase entire item instead of character in caption
  //focused_input = AThis;

  // esc = if input element is focused, unfocus it (switch to items editing)
  if (AEvent.keyCode==27) {
    console.log('ESC');
    document.getElementById(tool).focus();
  }

}