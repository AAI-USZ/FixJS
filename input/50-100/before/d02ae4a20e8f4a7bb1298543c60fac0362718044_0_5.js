function(expression, objectGroup, includeCommandLineAPI, doNotPauseOnExceptionsAndMuteConsole, contextId, returnByValue, opt_callback/*(result,wasThrown)*/) {
        var paramObject = {
             'expression': expression,
             'objectGroup': objectGroup,
             'includeCommandLineAPI': includeCommandLineAPI,
             'doNotPauseOnExceptionsAndMuteConsole': doNotPauseOnExceptionsAndMuteConsole,
             'contextId': contextId,
             'returnByValue': returnByValue,
         };
        chrome.devtools.remoteDebug.sendCommand('Runtime.evaluate', paramObject, opt_callback);
    }