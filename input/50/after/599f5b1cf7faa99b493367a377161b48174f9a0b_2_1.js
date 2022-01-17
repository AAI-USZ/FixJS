function(hexShiftBy) {
      var number2 = ByteCode.pop();
      var number1 = ByteCode.pop();

      var shift = number2.value & hexShiftBy;
      //Get the lower 5 bits of number 2
      ByteCode.push(number1.shiftLeft(shift));
    }