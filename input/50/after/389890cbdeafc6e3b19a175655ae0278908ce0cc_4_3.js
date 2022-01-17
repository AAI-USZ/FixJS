function(hexShiftBy) {
      var number2 = ByteCode.pop();
      var number1 = ByteCode.pop();

      var shift = number2.value() & hexShiftBy;
      ByteCode.push(number1.shiftRightUnsigned(shift));
    }