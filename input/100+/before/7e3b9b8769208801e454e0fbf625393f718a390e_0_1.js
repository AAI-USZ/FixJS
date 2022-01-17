function(
    pressShiftKey, coordinate, size, limitPos) {

  var shiftValueTemplate = thin.editor.Action.ShiftValue;
  var shiftValue = pressShiftKey ? shiftValueTemplate.PRESSSHIFTKEY : shiftValueTemplate.NORMAL;

  var currentPos = coordinate + size;
  if (limitPos < (currentPos + shiftValue)) {
    shiftValue = limitPos - currentPos;
  } else {
    shiftValue -= coordinate % 1;
  }
  
  return thin.numberWithPrecision(shiftValue);
}