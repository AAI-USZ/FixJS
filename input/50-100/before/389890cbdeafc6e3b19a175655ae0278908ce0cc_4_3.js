function(initialValue) {
      var number2 = ByteCode.pop();
      var number1 = ByteCode.pop();

      var result = initialValue;

      if(isNaN(number1.value) || isNaN(number2.value)) {
        //Do nothing.
      } else {
        if(number1 > number2) {
          result = 1;
        } else if(number1 === number2) {
          result = 0;
        } else {
          result = -1;
        }
      }
      
      ByteCode.push(Primitives.getInteger(result));
    }