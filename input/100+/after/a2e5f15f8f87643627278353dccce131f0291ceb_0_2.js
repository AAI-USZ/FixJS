function runScriptInSandbox(script, sandbox) {
  function doEval(code, fileName) {
    try {
      Components.utils.evalInSandbox(code, sandbox, gMaxJSVersion, fileName, 1);
    } catch (e) {
      // Log it properly.
      GM_util.logError(e, false, fileName, e.lineNumber);
      // Stop the script, in the case of requires, as if it was one big script.
      return false;
    }
    return true;
  }

  for (var i = 0, require = null; require = script.requires[i]; i++) {
    if (!doEval(require.textContent, require.fileURL)) {
      return;
    }
  }
  doEval(script.textContent, script.fileURL);
}