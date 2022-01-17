function(offset) {
      var value2 = ByteCode.pop();
      var value1 = ByteCode.pop();

      if(value1.value() < value2.value()) {
        ByteCode.branch(3, offset);
        return;
      }
    }