function glFunctionArgToString(functionName, argumentIndex, value) {
  var funcInfo = glValidEnumContexts[functionName];
  if (funcInfo !== undefined) {
    if (funcInfo[argumentIndex]) {
      return glEnumToString(value);
    }
  }
  if (value === null) {
    return "null";
  } else if (value === undefined) {
    return "undefined";
  } else {
    return value.toString();
  }
}