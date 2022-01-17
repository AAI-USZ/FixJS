function runScriptInSandbox(script, sandbox) {
  // Eval the code, with anonymous wrappers when/if appropriate.
  function evalWithWrapper(code, fileName) {
    // By default, unless we've explicitly been told to unwrap, do an anonymous
    // wrapper scope.  See http://goo.gl/0sFqU for detailed reasoning.
    if (!script.unwrap) code = GM_util.anonWrap(code);

    try {
      Components.utils.evalInSandbox(code, sandbox, gMaxJSVersion, fileName, 1);
    } catch (e) {
      if (script.unwrap && e && "return not in function" == e.message) {
        // If we didn't wrap, but have an early return, run wrapped anyway.
        Components.utils.evalInSandbox(
            GM_util.anonWrap(code), sandbox, gMaxJSVersion, fileName, 1);
      } else {
        // Otherwise raise.
        throw e;
      }
    }
  }

  // Eval the code, with a try/catch to report errors cleanly.
  function evalWithCatch(code, fileName) {
    try {
      evalWithWrapper(code, fileName);
    } catch (e) {
      // Log it properly.
      GM_util.logError(e, false, fileName, e.lineNumber);
      // Stop the script, in the case of requires, as if it was one big script.
      return false;
    }
    return true;
  }

  for (var i = 0, require = null; require = script.requires[i]; i++) {
    if (!evalWithCatch(require.textContent, require.fileURL)) {
      return;
    }
  }
  evalWithCatch(script.textContent, script.fileURL);
}