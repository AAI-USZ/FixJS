function(){
      var theArguments = NativeFunctions.getArguments("(I)Ljava/lang/Class;");
      
      var numberOfFrames = theArguments[0].value();
      var frameOfInterest = JVM.getExecutingThread().getStack().stack[JVM.getExecutingThread().getStack().length -1 - numberOfFrames];
      
      MethodRun.createReturn(frameOfInterest.methodInfo.classInfo); //is the class
      
        //var frame = currentFrame();
        //var methodInfo
        //var exception = MethodRun.constructObject("java/lang/Class", "()V");

        //MethodRun.createReturn(exception); //Give it Class
      }