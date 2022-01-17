function(length, default_, npairs, matches) {
      var key = ByteCode.pop().value();

      //Set the offset to default, if a match is found it will be replaced.
      var offset = default_;
      for(var i = 0; i < npairs; i++) {
        if(matches[i].match < key) {
          break;
        }
        if(matches[i].match === key) {
          offset = matches[i].offset;
          break;
        }
      }

      //Offset now has the value for the next bytecode
      JVM.getExecutingThread().incrementPC(offset-length);

      return;
    }