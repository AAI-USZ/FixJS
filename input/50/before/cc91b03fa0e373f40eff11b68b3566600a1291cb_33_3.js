function(style, propName, prevValue, prevPriority, rule, baseText)
    {
        var styleSheet = rule.parentStyleSheet;
        this.markSheetDirty(styleSheet);
    }