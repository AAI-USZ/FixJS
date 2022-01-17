function GM_apiLeakCheck(apiName) {
  var stack = Components.stack;

  do {
    // Valid locations for GM API calls are:
    //  * Greasemonkey modules.
    //  * All of chrome.  (In the script update case, chrome will list values.)
    //  * Greasemonkey extension by path. (FF 3 does this instead of the above.)
    // Anything else on the stack and we will reject the API, to make sure that
    // the content window (whose path would be e.g. http://...) has no access.
    if (2 == stack.language
        && stack.filename.substr(0, 24) !== 'resource://greasemonkey/'
        && stack.filename.substr(0, 9) !== 'chrome://'
        && stack.filename.substr(0, gExtensionPath.length) !== gExtensionPath
        ) {
      GM_util.logError(new Error("Greasemonkey access violation: " +
          "unsafeWindow cannot call " + apiName + "."));
      return false;
    }

    stack = stack.caller;
  } while (stack);

  return true;
}