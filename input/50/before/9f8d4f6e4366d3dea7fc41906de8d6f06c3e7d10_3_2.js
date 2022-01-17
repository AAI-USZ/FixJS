function processResult(result) {
    writeOutput("" + (ReplCore.getType(result)) + ": " + (escape(Pretty.print(result))) + "\n");
    return ReplCore.processResult(result);
  }