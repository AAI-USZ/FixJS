function(methodDescriptor){
      var frame = JVM.getExecutingThread().getCurrentFrame();
      var numOfArgs = NativeFunctions.getNumOfArguments(methodDescriptor);
      var methodArguments = [];
      var effectiveI = 0;
      //alert("Num of Args: " + numOfArgs
      //alert("Things: " + frame.locals);
      for(var i = 0;i<numOfArgs; i++) {
        var variable = frame.locals[effectiveI];
        //alert(variable);
        //JVM.debugPrint("Local at " + effectiveI + ": " + variable.value);
        methodArguments.push(variable);
        //methodArguments.push(frame.pop());
        if (methodArguments[i] !== undefined && (methodArguments[i].dataType === Enum.dataType.LONG || methodArguments[i].dataType === Enum.dataType.DOUBLE))
        {
          effectiveI++;
        }
        effectiveI++;
      }
      return methodArguments; //Array the represents the stack
    }