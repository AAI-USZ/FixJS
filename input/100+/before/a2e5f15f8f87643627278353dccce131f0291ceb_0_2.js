function runScriptInSandbox(code, sandbox, script) {
  try {
    GM_runScript(code, sandbox, gMaxJSVersion);
  } catch (e) { // catches errors while running the script code
    try {
      if (e && "return not in function" == e.message) {
        // Means this script depends on the function enclosure.
        return false;
      }

      // Most errors seem to have a ".fileName", but rarely they're in
      // ".filename" instead.
      var fileName = e.fileName || e.filename;

      // TODO: Climb the stack to find the script-source line?
      if (fileName == gmRunScriptFilename) {
        // Now that we know where the error is, find it (inside @requires if
        // necessary) in the script and log it.
        var err = findError(script, e.lineNumber);
        GM_util.logError(
             e, // error obj
             0, // 0 = error (1 = warning)
             err.uri, err.lineNumber);
      } else {
        GM_util.logError(e);
      }
    } catch (e) {
      // Do not raise (this would stop all scripts), log.
      GM_util.logError(e);
    }
  }
  return true; // did not need a (function() {...})() enclosure.
}