function(element)
    {
        Events.dispatch(this.fbListeners, "onBeforeCSSRulesAdded", [this]);

        var result, warning, inheritLabel;
        var rules = [], sections = [], usedProps = {};

        this.getInheritedRules(element, sections, usedProps);
        this.getElementRules(element, rules, usedProps);

        if (rules.length || sections.length)
        {
            // This removes overridden properties.
            if (Firebug.onlyShowAppliedStyles)
                this.removeOverriddenProps(rules, sections);

            // This removes user agent rules
            if (!Firebug.showUserAgentCSS)
                this.removeSystemRules(rules, sections);
        }

        // Reset the selection, so that clicking that starts before the view
        // update still result in proper mouseup events (issue 5500).
        this.document.defaultView.getSelection().removeAllRanges();

        if (rules.length || sections.length)
        {
            inheritLabel = Locale.$STR("InheritedFrom");
            result = this.template.cascadedTag.replace({rules: rules, inherited: sections,
                inheritLabel: inheritLabel}, this.panelNode);

            var props = result.getElementsByClassName("cssProp");

            for (var i = 0; i < props.length; i++)
            {
                var prop = props[i];
                var propName = prop.getElementsByClassName("cssPropName").item(0).textContent;
                if (propName == "font-family" || propName == "font")
                {
                    var propValueElem = prop.getElementsByClassName("cssPropValue").item(0);
                    var propValue = propValueElem.textContent;
                    var fontPropValueParts = getFontPropValueParts(element, propValue, propName);

                    // xxxsz: Web fonts not being loaded at display time
                    // won't be marked as used. See issue 5420.
                    this.template.CSSFontPropValueTag.replace({propValueParts: fontPropValueParts},
                        propValueElem);
                }
            }

            Events.dispatch(this.fbListeners, "onCSSRulesAdded", [this, result]);
        }
        else
        {
            warning = FirebugReps.Warning.tag.replace({object: ""}, this.panelNode);
            result = FirebugReps.Description.render(Locale.$STR("css.EmptyElementCSS"),
                warning, Obj.bind(this.editElementStyle, this));

            Events.dispatch([Firebug.A11yModel], "onCSSRulesAdded", [this, result]);
        }

        // Avoid a flickering "disable" icon by forcing a reflow (issue 5500).
        this.panelNode.offsetHeight;
    }