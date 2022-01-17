function printResult(result, wasThrown)
        {
            if (!result)
                return;

            if (!showResultOnly) {
                this.prompt.pushHistoryItem(text);
                WebInspector.settings.consoleHistory.set(this.prompt.historyData.slice(-30));
            }
            
            this._printResult(result, wasThrown);
        }