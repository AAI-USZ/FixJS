function(index) {
      var newPC = ByteCode.getLocal(index);

      //'Jump' :)
      JVM.getExecutingThread().setPC(newPC.value());

      //Do jump
    }