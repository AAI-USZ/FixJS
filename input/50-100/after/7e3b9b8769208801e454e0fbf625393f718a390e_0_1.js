function(
    pressShiftKey, currentPos, limitPos) {

  var shiftValueTemplate = thin.editor.Action.ShiftValue;

  if (pressShiftKey) {
    var shiftValue = shiftValueTemplate.PRESSSHIFTKEY + (currentPos % 1);
  } else {
    var shiftValue = shiftValueTemplate.NORMAL
    var remainder = currentPos % shiftValueTemplate.NORMAL;
    if (remainder != 0) {
      shiftValue = remainder
    }
  }
  
  if (limitPos > (currentPos - shiftValue)) {
    shiftValue = currentPos - limitPos;
  }
  return thin.numberWithPrecision(shiftValue);
}