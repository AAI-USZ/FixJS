function(element)
    {
        function isUnwantedProp(propName)
        {
            return !Firebug.showMozillaSpecificStyles && Str.hasPrefix(propName, "-moz")
        }

        var win = element.ownerDocument.defaultView;
        var computedStyle = win.getComputedStyle(element);

        try
        {
            if (this.cssLogic)
                this.cssLogic.highlight(element);
        }
        catch (e)
        {
            // An exception is thrown if the document is not fully loaded yet
            // The cssLogic API needs to be used after "load" has been fired.
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("computedPanel.doUpdateComputedView; EXCEPTION " + e, e);
        }

        var props = [];
        for (var i = 0; i < computedStyle.length; ++i)
        {
            var prop = this.cssLogic ? this.cssLogic.getPropertyInfo(computedStyle[i]) :
                Firebug.CSSModule.getPropertyInfo(computedStyle, computedStyle[i]);

            if (isUnwantedProp(prop.property) ||
                (this.cssLogic && !Firebug.showUserAgentCSS && prop.matchedRuleCount == 0))
            {
                continue;
            }

            props.push(prop);
        }

        var parentNode = this.template.computedStylesTag.replace({}, this.panelNode);

        if (props.length != 0)
        {
            if (Firebug.computedStylesDisplay == "alphabetical")
            {
                this.sortProperties(props);

                for (var i = 0; i < props.length; ++i)
                    props[i].opened = this.styleOpened[props[i].property];

                var result = this.template.stylesTag.replace({props: props}, parentNode);
            }
            else
            {
                var groups = [];
                for (var groupName in styleGroups)
                {
                    var title = Locale.$STR("StyleGroup-" + groupName);
                    var group = {name: groupName, title: title, props: []};

                    var groupProps = styleGroups[groupName];
                    for (var i = 0; i < groupProps.length; ++i)
                    {
                        var propName = groupProps[i];
                        if (isUnwantedProp(propName))
                            continue;

                        var prop = this.cssLogic ? this.cssLogic.getPropertyInfo(propName) :
                            Firebug.CSSModule.getPropertyInfo(computedStyle, propName);

                        if (!Firebug.showUserAgentCSS && prop.matchedRuleCount == 0)
                            continue;

                        prop.opened = this.styleOpened[propName];

                        group.props.push(prop);

                        for (var j = 0; j < props.length; ++j)
                        {
                            if (props[j].property == propName)
                            {
                                props.splice(j, 1);
                                break;
                            }
                        }
                    }

                    group.opened = this.groupOpened[groupName];

                    groups.push(group);
                }

                if (props.length > 0)
                {
                    var group = groups[groups.length-1];
                    for (var i = 0; i < props.length; ++i)
                    {
                        var propName = props[i].property;
                        if (isUnwantedProp(propName))
                            continue;

                        var prop = this.cssLogic ? this.cssLogic.getPropertyInfo(propName) :
                            Firebug.CSSModule.getPropertyInfo(computedStyle, propName);

                        prop.opened = this.styleOpened[propName];

                        group.props.push(prop);
                    }

                    group.opened = this.groupOpened[group.name];
                }

                var result = this.template.groupedStylesTag.replace({groups: groups}, parentNode);
            }
        }
        else
        {
            FirebugReps.Warning.tag.replace({object: "computed.No_User-Defined_Styles"},
                this.panelNode);
        }

        if (this.scrollTop)
        {
            this.panelNode.scrollTop = this.scrollTop;
            delete this.scrollTop;
        }

        Events.dispatch(this.fbListeners, "onCSSRulesAdded", [this, result]);
    }