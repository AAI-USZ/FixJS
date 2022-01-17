function(length, default_, low, high, offsets) {
      var index = ByteCode.pop().value;
      //Value of an integer

      //Set the offset to default, if the index is within the bounds get the offset
      var offset = default_;
      if(index >= low || index <= high) {
        offset = offsets[index - low];
      }

      //Offset now has the value for the next bytecode
      JVM.getExecutingThread().incrementPC(offset-length);

    }