function() {
      var firstValue = ByteCode.pop();
      var secondValue = ByteCode.pop();

      //Check for which form needs to be done
      if(secondValue.type === Enum.dataType.LONG || secondValue.type === Enum.dataType.DOUBLE) {
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