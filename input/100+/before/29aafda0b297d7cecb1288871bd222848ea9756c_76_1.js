function appendRules(cssRules)
        {
            var i, props, ruleId;

            if (!cssRules)
                return;

            for (i=0; i<cssRules.length; ++i)
            {
                var rule = cssRules[i];
                if (rule instanceof window.CSSStyleRule)
                {
                    props = this.getRuleProperties(context, rule);
                    ruleId = this.getRuleId(rule);
                    rules.push({
                        tag: CSSStyleRuleTag.tag,
                        rule: rule,
                        id: ruleId,
                        // Show universal selectors with pseudo-class
                        // (http://code.google.com/p/fbug/issues/detail?id=3683)
                        selector: rule.selectorText.replace(/ :/g, " *:"),
                        props: props,
                        isSystemSheet: isSystemSheet,
                        isSelectorEditable: true
                    });
                }
                else if (rule instanceof window.CSSImportRule)
                {
                    rules.push({tag: CSSImportRuleTag.tag, rule: rule});
                }
                else if (rule instanceof window.CSSCharsetRule)
                {
                  rules.push({tag: CSSCharsetRuleTag.tag, rule: rule});
                }
                else if (rule instanceof window.CSSMediaRule ||
                    rule instanceof window.CSSMozDocumentRule)
                {
                    appendRules.apply(this, [Css.safeGetCSSRules(rule)]);
                }
                else if (rule instanceof window.CSSFontFaceRule)
                {
                    props = this.parseCSSProps(rule.style);
                    this.sortProperties(props);
                    rules.push({
                        tag: CSSFontFaceRuleTag.tag, rule: rule,
                        props: props, isSystemSheet: isSystemSheet,
                        isNotEditable: true
                    });
                }
                else if (rule instanceof window.CSSNameSpaceRule &&
                    !(rule instanceof window.MozCSSKeyframesRule ||
                        rule instanceof window.MozCSSKeyframeRule))
                {
                    // Workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=754772
                    // MozCSSKeyframesRules and MozCSSKeyframeRules are recognized as
                    // CSSNameSpaceRules, so explicitly check whether the rule is not a
                    // MozCSSKeyframesRule or a MozCSSKeyframeRule

                    var reNamespace = /^@namespace ((.+) )?url\("(.*?)"\);$/;
                    var namespace = rule.cssText.match(reNamespace);
                    var prefix = namespace[2] || "";
                    var name = namespace[3];
                    rules.push({tag: CSSNamespaceRuleTag.tag, rule: rule, prefix: prefix,
                        name: name, isNotEditable: true});
                }
                else
                {
                    if (FBTrace.DBG_ERRORS && FBTrace.DBG_CSS)
                        FBTrace.sysout("css getStyleSheetRules failed to classify a rule ", rule);
                }
            }
        }