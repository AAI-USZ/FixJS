function(){
      var arrayOfArguments = NativeFunctions.getArguments("(F)V");
      var floatToPrint = arrayOfArguments[0];
      JVM.println(floatToPrint.value.toString());
      MethodRun.createReturn();
      }