function(objectId, functionDeclaration, arguments, doNotPauseOnExceptionsAndMuteConsole, returnByValue, opt_callback/*(result,wasThrown)*/) {
        var paramObject = {
             'objectId': objectId,
             'functionDeclaration': functionDeclaration,
             'arguments': arguments,
             'doNotPauseOnExceptionsAndMuteConsole': doNotPauseOnExceptionsAndMuteConsole,
             'returnByValue': returnByValue,
         };
        chrome.devtools.remoteDebug.sendCommand('Runtime.callFunctionOn', paramObject, opt_callback);
    }