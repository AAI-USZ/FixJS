function printCharArrayToConsole(arrayToPrint){
      JVM.println("[");
      //Not sure if length or
      for (var i = 0; i < arrayToPrint.length; i++){
        if(arrayToPrint[i] === undefined){
          JVM.print(' ');
        }else{
          JVM.print(String.fromCharCode(arrayToPrint[i].value));
        }
        
        if(i != arrayToPrint.length - 1){
          JVM.print(',');
        }
      }
      JVM.print(']');
    }