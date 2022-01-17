function(target, value, previousValue)
    {
        if (FBTrace.DBG_CSS)
            FBTrace.sysout("CSSRuleEditor.saveEdit: '" + value + "'  '" + previousValue +
                "'", target);

        target.innerHTML = Str.escapeForCss(value);

        if (value === previousValue)
            return;

        var row = Dom.getAncestorByClass(target, "cssRule");

        var rule = Firebug.getRepObject(target);
        var searchRule = rule || Firebug.getRepObject(row.nextSibling);
        var oldRule, ruleIndex;

        if (searchRule)
        {
            // take care of media rules
            var styleSheet = searchRule.parentRule || searchRule.parentStyleSheet;
            if(!styleSheet)
                return;

            var cssRules = styleSheet.cssRules;
            for (ruleIndex=0; ruleIndex<cssRules.length && searchRule!=cssRules[ruleIndex];
                ruleIndex++)
            {
            }

            if (rule)
                oldRule = searchRule;
            else
                ruleIndex++;
        }
        else
        {
            if (this.panel.name != "stylesheet")
                return;

            var styleSheet = this.panel.location;//this must be stylesheet panel
            if (!styleSheet)
            {
                // If there is no stylesheet on the page we need to create a temporary one,
                // in order to make a place where to put (custom) user provided rules.
                // If this code would be in this.getDefaultLocation the default stylesheet
                // would be created automatically for all pages with not styles, which
                // could be damaging for special pages (see eg issue 2440)
                // At this moment the user edits the styles so some CSS changes on the page
                // are expected.
                var doc = this.panel.context.window.document;
                var style = Css.appendStylesheet(doc, "chrome://firebug/default-stylesheet.css");
                Wrapper.getContentView(style).defaultStylesheet = true;
                this.panel.location = styleSheet = style.sheet;
            }

            styleSheet = styleSheet.editStyleSheet ? styleSheet.editStyleSheet.sheet : styleSheet;
            cssRules = styleSheet.cssRules;
            ruleIndex = cssRules.length;
        }

        // Delete in all cases except for new add
        // We want to do this before the insert to ease change tracking
        if (oldRule)
        {
            CSSModule.deleteRule(styleSheet, ruleIndex);
        }

        // Firefox does not follow the spec for the update selector text case.
        // When attempting to update the value, firefox will silently fail.
        // See https://bugzilla.mozilla.org/show_bug.cgi?id=37468 for the quite
        // old discussion of this bug.
        // As a result we need to recreate the style every time the selector
        // changes.
        if (value)
        {
            var cssText = [ value, "{", ];
            var props = row.getElementsByClassName("cssProp");
            for (var i = 0; i < props.length; i++)
            {
                var propEl = props[i];
                if (!Css.hasClass(propEl, "disabledStyle"))
                {
                    cssText.push(Dom.getChildByClass(propEl, "cssPropName").textContent);
                    cssText.push(":");
                    cssText.push(Dom.getChildByClass(propEl, "cssPropValue").textContent);
                    cssText.push(";");
                }
            }

            cssText.push("}");
            cssText = cssText.join("");

            try
            {
                var insertLoc = CSSModule.insertRule(styleSheet, cssText, ruleIndex);
                rule = cssRules[insertLoc];
                ruleIndex++;

                var saveSuccess = this.panel.name != "css";
                if (!saveSuccess)
                    saveSuccess =(this.panel.selection &&
                        this.panel.selection.mozMatchesSelector(value))? true: 'almost';

                this.box.setAttribute('saveSuccess',saveSuccess);
            }
            catch (err)
            {
                if (FBTrace.DBG_CSS || FBTrace.DBG_ERRORS)
                    FBTrace.sysout("CSS Insert Error: "+err, err);

                target.innerHTML = Str.escapeForCss(previousValue);
                // create dummy rule to be able to recover from error
                var insertLoc = CSSModule.insertRule(styleSheet,
                    'selectorSavingError{}', ruleIndex);
                rule = cssRules[insertLoc];

                this.box.setAttribute('saveSuccess',false);

                row.repObject = rule;
                return;
            }
        }
        else
        {
            rule = undefined;
        }

        // Update the rep object
        row.repObject = rule;
        if (!oldRule)
        {
            // Who knows what the domutils will return for rule line
            // for a recently created rule. To be safe we just generate
            // a unique value as this is only used as an internal key.
            var ruleId = "new/"+value+"/"+(++CSSRuleEditor.uniquifier);
            row.setAttribute("ruleId", ruleId);
        }

        this.panel.markChange(this.panel.name == "stylesheet");
    }