function(
    pressShiftKey, currentPos, limitPos) {

  var shiftValueTemplate = thin.editor.Action.ShiftValue;
  var shiftValue = pressShiftKey ? shiftValueTemplate.PRESSSHIFTKEY : shiftValueTemplate.NORMAL;
  
  if (limitPos > (currentPos - shiftValue)) {
    shiftValue = currentPos - limitPos;
  } else {
    shiftValue += currentPos % 1;
  }
  
  return thin.numberWithPrecision(shiftValue);
}