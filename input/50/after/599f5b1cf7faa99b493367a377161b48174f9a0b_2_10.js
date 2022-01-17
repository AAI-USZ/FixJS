function(offset) {
      var number = ByteCode.pop();

      if(number.value >= 0) {
        ByteCode.branch(3, offset);
        return;
      }
    }