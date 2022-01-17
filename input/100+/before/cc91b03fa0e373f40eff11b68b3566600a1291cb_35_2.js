function(element, rules, usedProps, inheritMode)
    {
        var pseudoElements = [""];
        var inspectedRules, displayedRules = {};

        // Firefox 6+ allows inspecting of pseudo-elements (see issue 537)
        if (DOMUTILS_SUPPORTS_PSEUDOELEMENTS && !inheritMode)
            pseudoElements = Arr.extendArray(pseudoElements,
                [":first-letter", ":first-line", ":before", ":after"]);

        for (var p in pseudoElements)
        {
            try
            {
                inspectedRules = Dom.domUtils.getCSSStyleRules(element, pseudoElements[p]);
            }
            catch (exc)
            {
                continue;
            }

            if (!inspectedRules)
                continue;

            for (var i = 0; i < inspectedRules.Count(); ++i)
            {
                var rule = Xpcom.QI(inspectedRules.GetElementAt(i), nsIDOMCSSStyleRule);
                var isSystemSheet = Url.isSystemStyleSheet(rule.parentStyleSheet);

                var props = this.getRuleProperties(this.context, rule, inheritMode);
                if (inheritMode && !props.length)
                    continue;

                var isPseudoElementSheet = (pseudoElements[p] != "");
                var sourceLink = this.getSourceLink(null, rule);

                if (!isPseudoElementSheet)
                    this.markOverriddenProps(element, props, usedProps, inheritMode);

                var ruleId = this.getRuleId(rule);
                rules.splice(0, 0, {rule: rule, id: ruleId,
                    // Show universal selectors with pseudo-class
                    // (http://code.google.com/p/fbug/issues/detail?id=3683)
                    selector: rule.selectorText.replace(/ :/g, " *:"),
                    sourceLink: sourceLink,
                    props: props, inherited: inheritMode,
                    isSystemSheet: isSystemSheet,
                    isPseudoElementSheet: isPseudoElementSheet,
                    isSelectorEditable: true
                });
            }
        }

        if (element.style)
            this.getStyleProperties(element, rules, usedProps, inheritMode);

        if (FBTrace.DBG_CSS)
            FBTrace.sysout("getElementRules "+rules.length+" rules for "+
                Xpath.getElementXPath(element), rules);
    }