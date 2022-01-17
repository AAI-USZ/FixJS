function(
    pressShiftKey, coordinate, size, limitPos) {

  var shiftValueTemplate = thin.editor.Action.ShiftValue;
  var currentPos = coordinate + size;

  if (pressShiftKey) {
    var shiftValue = shiftValueTemplate.PRESSSHIFTKEY - (coordinate % 1);
  } else {
    var remainder = coordinate % shiftValueTemplate.NORMAL;
    var shiftValue = shiftValueTemplate.NORMAL;
    if (remainder != 0) {
      shiftValue -= remainder
    }
  }

  if (limitPos < (currentPos + shiftValue)) {
    shiftValue = limitPos - currentPos;
  }
  
  return thin.numberWithPrecision(shiftValue);
}