function(context, styleProperty, event)
    {
        if (!/^(?:Page)?(?:Up|Down)$/.test(event.keyIdentifier))
            return;
        var element = event.currentTarget;

        var selection = window.getSelection();
        if (!selection.rangeCount)
            return;

        var selectionRange = selection.getRangeAt(0);
        if (!selectionRange.commonAncestorContainer.isSelfOrDescendant(element))
            return;

        var originalValue = element.textContent;
        var wordRange = selectionRange.startContainer.rangeOfWord(selectionRange.startOffset, WebInspector.StylesSidebarPane.StyleValueDelimiters, element);
        var wordString = wordRange.toString();

        var matches = /(.*?)(-?(?:\d+(?:\.\d+)?|\.\d+))(.*)/.exec(wordString);
        var replacementString;
        if (matches && matches.length) {
            var prefix = matches[1];
            var suffix = matches[3];
            var number = WebInspector.StylesSidebarPane.alteredFloatNumber(parseFloat(matches[2]), event);
            if (number === null) {
                // Need to check for null explicitly.
                return;
            }

            if (styleProperty !== "margin" && number < 0)
                number = 0;

            replacementString = prefix + number + suffix;
        }
        if (!replacementString)
            return;

        var replacementTextNode = document.createTextNode(replacementString);

        wordRange.deleteContents();
        wordRange.insertNode(replacementTextNode);

        var finalSelectionRange = document.createRange();
        finalSelectionRange.setStart(replacementTextNode, 0);
        finalSelectionRange.setEnd(replacementTextNode, replacementString.length);

        selection.removeAllRanges();
        selection.addRange(finalSelectionRange);

        event.handled = true;
        event.preventDefault();
        this._applyUserInput(element, replacementString, originalValue, context, false);
    }