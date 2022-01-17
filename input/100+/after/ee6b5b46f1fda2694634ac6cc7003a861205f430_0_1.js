function execute(shell, className) { //+ arguments
      Util.assert(JVM.getExecutingThread().isStackEmpty());
      
      var classInfo = JVM.getLoadedClass(className);

      //Ensure the class exists.
      if (classInfo === undefined)
      {
        shell.stderr("ERROR: " + className + " is not currently loaded.\n");
        return;
      }

      var mainMethod = classInfo.getMethodAssert("main", "([Ljava/lang/String;)V");
      
      var stringClass = JVM.getClass("java/lang/String");
      var args = new JavaArray(Data.type.OBJECT, stringClass, 1, arguments.length-1);
      
      for (var i = 1; i < arguments.length; i++)
      {
        var stringObj = Util.getJavaString(arguments[i]);
        
        args.set(i, stringObj);
      }
      
      MethodRun.createCall(mainMethod, args);

      //TODO: Move this into its own goddamn function which allows for function resumption.
      while (!JVM.getExecutingThread().isStackEmpty())
      {
        var method = JVM.getExecutingThread().pop();
        try
        {
          method.execute();
        }
        catch (err)
        {
          //If it has classInfo, it's a Java exception.
          if (typeof err !== "string" && typeof err !== "object")
          {
            //If the stack is empty, there are no more functions to catch it.
            if (JVM.getExecutingThread().isStackEmpty())
            {
              //TODO: Handle unhandled exceptions here. toString? Call stack?
              shell.stderr("ERROR: Uncaught exception of type " + err.classInfo.thisClassName + ".\n");
            }
            
            //If the stack is not empty, ignore the exception; it may still be caught.
          }
          //Otherwise, it's a JavaScript exception! Print it.
          else
          {
            shell.stderr("JVM Exception: " + err + "\n");

            shell.stdout(JVM.getExecutingThread().getCurrentMethod().toStringWithCode(JVM.getExecutingThread().getPC()) + "\n");

            //Empty the stack. We are done executing.
            JVM.getExecutingThread().clearStack();
          }
        }
      }
      shell.stdout("\nProgram Ended\n");
      //TODO: Somehow trigger input without this function being responsible for it.
    }