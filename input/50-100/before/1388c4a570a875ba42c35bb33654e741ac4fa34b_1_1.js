function indexForFunction(functionName, libraryName) {
    var resolve = functionName+"_LIBNAME_"+libraryName;
    if (resolve in functionIndices)
      return functionIndices[resolve];
    var newIndex = functions.length;
    functions[newIndex] = {
      functionName: functionName,
      libraryName: libraryName
    };
    functionIndices[resolve] = newIndex;
    return newIndex;
  }