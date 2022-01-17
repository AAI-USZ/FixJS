function(scriptId)
    {
        var contextId = WebInspector.consoleView._currentEvaluationContextId();
        DebuggerAgent.runScript(scriptId, contextId, "console", false, runCallback.bind(this));
        WebInspector.userMetrics.ConsoleEvaluated.record();

        /**
         * @param {?string} error
         * @param {?RuntimeAgent.RemoteObject} result
         * @param {boolean=} wasThrown
         */
        function runCallback(error, result, wasThrown)
        {
            if (error) {
                console.error(error);
                return;
            }
            
            this._printResult(result, wasThrown);
        }
    }