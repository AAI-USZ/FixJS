function() {
      var firstValue = ByteCode.pop();
      var secondValue = ByteCode.pop();

      //Check for which form needs to be done
      if(secondValue.type === Data.type.LONG || secondValue.type === Data.type.DOUBLE) {
        ByteCode.push(firstValue);
        ByteCode.push(secondValue);
        ByteCode.push(firstValue);
      } else {
        var thirdValue = ByteCode.pop();
        ByteCode.push(firstValue);
        ByteCode.push(thirdValue);
        ByteCode.push(secondValue);
        ByteCode.push(firstValue);
      }
    }