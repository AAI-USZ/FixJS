function(){
      var arrayOfArguments = NativeFunctions.getArguments("(I)V");
      var intToPrint = arrayOfArguments[0];
      JVM.println(intToPrint.value.toString());
      MethodRun.createReturn();
      }