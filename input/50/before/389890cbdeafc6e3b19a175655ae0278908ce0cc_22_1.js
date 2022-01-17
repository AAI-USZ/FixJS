function(){
      var arrayOfArguments = NativeFunctions.getArguments("(C)V");
      var charToPrint = arrayOfArguments[0];
      JVM.println(String.fromCharCode(charToPrint.value));
      MethodRun.createReturn();
      }