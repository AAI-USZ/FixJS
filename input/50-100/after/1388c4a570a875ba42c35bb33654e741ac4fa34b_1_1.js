function indexForFunction(functionName, libraryName, isJSFrame) {
    var resolve = functionName+"_LIBNAME_"+libraryName;
    if (resolve in functionIndices)
      return functionIndices[resolve];
    var newIndex = functions.length;
    functions[newIndex] = {
      functionName: functionName,
      libraryName: libraryName,
      isJSFrame: isJSFrame
    };
    functionIndices[resolve] = newIndex;
    return newIndex;
  }