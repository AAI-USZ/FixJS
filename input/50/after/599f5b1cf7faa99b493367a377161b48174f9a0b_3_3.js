function(){
      var arrayOfArguments = NativeFunctions.getArguments("(D)V");
      var doubleToPrint = arrayOfArguments[0];
      JVM.println(doubleToPrint.value.toString());
      MethodRun.createReturn();
      }