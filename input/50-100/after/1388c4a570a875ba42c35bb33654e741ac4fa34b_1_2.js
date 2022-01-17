function parseSymbol(symbol) {
    var info = getFunctionInfo(symbol);
    return {
      symbolName: symbol,
      functionName: info.functionName,
      functionIndex: indexForFunction(info.functionName, info.libraryName, info.isJSFrame),
      lineInformation: info.lineInformation,
      isJSFrame: info.isJSFrame
    };
  }