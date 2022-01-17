function(style, propName, propValue, propPriority, prevValue,
        prevPriority, rule, baseText)
    {
        var styleSheet = rule.parentStyleSheet;
        this.markSheetDirty(styleSheet);
    }