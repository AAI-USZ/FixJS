function(){
      //alert("Printing String");
      var arrayOfArguments = NativeFunctions.getArguments("(Ljava/lang/String;)V");
      var string = arrayOfArguments[0];
      var arrayToPrint = string.getField("java/lang/String", "value", "[C");
      //alert(arrayToPrint + ": " + arrayToPrint.array);
      arrayToPrint = arrayToPrint.array;
      
      JVM.println("");
      //Not sure if length or
      for (var i = 0; i < arrayToPrint.length; i++){
        if(arrayToPrint[i] !== undefined){
          JVM.print(String.fromCharCode(arrayToPrint[i].value));
        }
      }
      MethodRun.createReturn();
    }