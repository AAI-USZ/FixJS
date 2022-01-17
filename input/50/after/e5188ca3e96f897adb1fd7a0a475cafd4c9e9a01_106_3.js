function(style, propName, prevValue, prevPriority, rule, baseText)
    {
        var styleSheet = rule.parentStyleSheet;
        if (styleSheet)
            this.markSheetDirty(styleSheet);
    }