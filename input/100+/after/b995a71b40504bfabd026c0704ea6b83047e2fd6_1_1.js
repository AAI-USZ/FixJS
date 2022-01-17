function(context, styleProperty, event)
    {
        var element = event.currentTarget;

        function finishHandler(originalValue, replacementString)
        {
            this._applyUserInput(element, replacementString, originalValue, context, false);
        }

        function customNumberHandler(number)
        {
            if (styleProperty !== "margin" && number < 0)
                number = 0;
            return number;
        }

        WebInspector.handleElementValueModifications(event, element, finishHandler.bind(this), undefined, customNumberHandler);
    }