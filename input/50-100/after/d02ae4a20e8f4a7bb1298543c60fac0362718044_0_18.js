function(callFrameId, expression, objectGroup, includeCommandLineAPI, doNotPauseOnExceptionsAndMuteConsole, returnByValue, opt_callback/*(result,wasThrown)*/) {
        var paramObject = {
             'callFrameId': callFrameId,
             'expression': expression,
             'objectGroup': objectGroup,
             'includeCommandLineAPI': includeCommandLineAPI,
             'doNotPauseOnExceptionsAndMuteConsole': doNotPauseOnExceptionsAndMuteConsole,
             'returnByValue': returnByValue,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.evaluateOnCallFrame', paramObject, opt_callback);
    }