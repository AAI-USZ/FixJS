function processResult(result) {
    writeOutput("" + (ReplCore.getType(result)) + ": " + (escape(Parse.print(result))) + "\n");
    return ReplCore.processResult(result);
  }