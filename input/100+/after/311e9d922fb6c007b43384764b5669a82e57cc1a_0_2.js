function GM_apiLeakCheck(apiName) {
  var stack = Components.stack;

  do {
    // Valid locations for GM API calls are:
    //  * Greasemonkey scripts.
    //  * Greasemonkey extension by path.
    //  * Greasemonkey modules.
    //  * All of chrome.  (In the script update case, chrome will list values.)
    // Anything else on the stack and we will reject the API, to make sure that
    // the content window (whose path would be e.g. http://...) has no access.
    if (2 == stack.language
        && stack.filename.substr(0, gScriptDirPath.length) !== gScriptDirPath
        && stack.filename.substr(0, gExtensionPath.length) !== gExtensionPath
        && stack.filename.substr(0, 24) !== 'resource://greasemonkey/'
        && stack.filename.substr(0, 9) !== 'chrome://'
        ) {
      GM_util.logError(new Error("Greasemonkey access violation: " +
          "unsafeWindow cannot call " + apiName + "."));
      return false;
    }

    stack = stack.caller;
  } while (stack);

  return true;
}