function(text, newPromptText, useCommandLineAPI, showResultOnly)
    {
        if (!showResultOnly) {
            var commandMessage = new WebInspector.ConsoleCommand(text);
            WebInspector.console.interruptRepeatCount();
            this._appendConsoleMessage(commandMessage);
        }
        this.prompt.text = newPromptText;

        function printResult(result, wasThrown)
        {
            if (!result)
                return;

            if (!showResultOnly) {
                this.prompt.pushHistoryItem(text);
                WebInspector.settings.consoleHistory.set(this.prompt.historyData.slice(-30));
            }

            this._appendConsoleMessage(new WebInspector.ConsoleCommandResult(result, wasThrown, commandMessage, this._linkifier));
        }
        this.evalInInspectedWindow(text, "console", useCommandLineAPI, false, false, printResult.bind(this));

        WebInspector.userMetrics.ConsoleEvaluated.record();
    }