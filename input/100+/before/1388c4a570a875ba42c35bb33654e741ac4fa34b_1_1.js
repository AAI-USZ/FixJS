function getFunctionInfo(fullName) {
    var match =
      /^(.*) \(in ([^\)]*)\) (\+ [0-9]+)$/.exec(fullName) ||
      /^(.*) \(in ([^\)]*)\) (\(.*:.*\))$/.exec(fullName) ||
      /^(.*) \(in ([^\)]*)\)$/.exec(fullName);
      // Try to parse a JS frame
    var jsMatch1 = match ||
      /^(.*) \((.*):([0-9]+)\)$/.exec(fullName);
    if (!match && jsMatch1) {
      match = [0, jsMatch1[1]+"() @ "+parseScriptFile(jsMatch1[2]) + ":" + jsMatch1[3], parseResourceName(jsMatch1[2]), ""];
    }
    var jsMatch2 = match ||
      /^(.*):([0-9]+)$/.exec(fullName);
    if (!match && jsMatch2) {
      match = [0, "<Anoymous> @ "+parseScriptFile(jsMatch2[1]) + ":" + jsMatch2[2], parseResourceName(jsMatch2[1]), ""];
    }
    if (!match) {
      match = [fullName, fullName];
    }
    return {
      functionName: cleanFunctionName(match[1]),
      libraryName: match[2] || "",
      lineInformation: match[3] || ""
    };
  }