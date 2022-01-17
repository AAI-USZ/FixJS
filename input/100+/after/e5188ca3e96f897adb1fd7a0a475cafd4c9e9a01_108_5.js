function(Obj, Firebug, Firefox, Domplate, FirebugReps, Xpcom, Locale, Events, Url, Arr,
    SourceLink, Dom, Css, Xpath, Arr, Fonts, Options, CSSModule, CSSStyleSheetPanel, Menu) {

with (Domplate) {

// ********************************************************************************************* //
// Constants

const Cc = Components.classes;
const Ci = Components.interfaces;
const nsIDOMCSSStyleRule = Ci.nsIDOMCSSStyleRule;

// before firefox 6 getCSSStyleRules accepted only one argument
const DOMUTILS_SUPPORTS_PSEUDOELEMENTS = Dom.domUtils.getCSSStyleRules.length > 1;

// See: http://mxr.mozilla.org/mozilla1.9.2/source/content/events/public/nsIEventStateManager.h#153
const STATE_ACTIVE  = 0x01;
const STATE_FOCUS   = 0x02;
const STATE_HOVER   = 0x04;

// ********************************************************************************************* //
// CSS Elemenet Panel (HTML side panel)

function CSSStylePanel() {}

CSSStylePanel.prototype = Obj.extend(CSSStyleSheetPanel.prototype,
{
    template: domplate(
    {
        cascadedTag:
            DIV({"class": "a11yCSSView", role: "presentation"},
                DIV({"class": "cssNonInherited", role: "list",
                        "aria-label": Locale.$STR("aria.labels.style rules") },
                    FOR("rule", "$rules",
                        TAG("$ruleTag", {rule: "$rule"})
                    )
                ),
                DIV({role: "list", "aria-label": Locale.$STR("aria.labels.inherited style rules")},
                    FOR("section", "$inherited",
                        H1({"class": "cssInheritHeader groupHeader focusRow", role: "listitem" },
                            SPAN({"class": "cssInheritLabel"}, "$inheritLabel"),
                            TAG(FirebugReps.Element.shortTag, {object: "$section.element"})
                        ),
                        DIV({role: "group"},
                            FOR("rule", "$section.rules",
                                TAG("$ruleTag", {rule: "$rule"})
                            )
                        )
                    )
                 )
            ),

        ruleTag:
            DIV({"class": "cssElementRuleContainer"},
                TAG(Firebug.CSSStyleRuleTag.tag, {rule: "$rule"}),
                TAG(FirebugReps.SourceLink.tag, {object: "$rule.sourceLink"})
            ),

        newRuleTag:
            DIV({"class": "cssElementRuleContainer"},
                DIV({"class": "cssRule insertBefore", style: "display: none"}, "")
            ),

        CSSFontPropValueTag:
            SPAN({"class": "cssFontPropValue"},
                FOR("part", "$propValueParts",
                    SPAN({"class": "$part.type|getClass", _repObject: "$part.font"}, "$part.value"),
                    SPAN({"class": "cssFontPropSeparator"}, "$part|getSeparator")
                )
            ),

        getSeparator: function(part)
        {
            if (part.type == "otherProps")
                return " ";

            if (part.lastFont || part.type == "important")
                return "";

            return ",";
        },

        getClass: function(type)
        {
            switch (type)
            {
                case "used":
                    return "cssPropValueUsed";

                case "unused":
                    return "cssPropValueUnused";

                default:
                    return "";
            }
        }
    }),

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // All calls to this method must call cleanupSheets first

    updateCascadeView: function(element)
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
    },

    getStylesheetURL: function(rule, getBaseUri)
    {
        // If parentStyleSheet.href is null, then per the CSS standard this is an inline style.
        if (rule && rule.parentStyleSheet && rule.parentStyleSheet.href)
            return rule.parentStyleSheet.href;
        else if (getBaseUri)
            return this.selection.ownerDocument.baseURI;
        else
            return this.selection.ownerDocument.location.href;
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    // All calls to this method must call cleanupSheets first
    getInheritedRules: function(element, sections, usedProps)
    {
        var parent = element.parentNode;
        if (parent && parent.nodeType == 1)
        {
            this.getInheritedRules(parent, sections, usedProps);

            var rules = [];
            this.getElementRules(parent, rules, usedProps, true);

            if (rules.length)
                sections.unshift({element: parent, rules: rules});
        }
    },

    // All calls to this method must call cleanupSheets first
    getElementRules: function(element, rules, usedProps, inheritMode)
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
                rules.unshift({rule: rule, id: ruleId,
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
            FBTrace.sysout("getElementRules " + rules.length + " rules for " +
                Xpath.getElementXPath(element), rules);
    },

    markOverriddenProps: function(element, props, usedProps, inheritMode)
    {
        // Element can contain an invalid name (see issue 5303)
        try
        {
            var dummyElement = element.ownerDocument.createElementNS(
                element.namespaceURI, element.tagName);
        }
        catch (err)
        {
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("css.markOverriddenProps:", err);
            return;
        }

        for (var i=0; i<props.length; i++)
        {
            var prop = props[i];

            // Helper array for all shorthand properties for the current property.
            prop.computed = {};

            // Get all shorthand propertis.
            var dummyStyle = dummyElement.style;

            // xxxHonza: Not sure why this happens.
            if (!dummyStyle && FBTrace.DBG_ERRORS)
            {
                FBTrace.sysout("css.markOverridenProps; ERROR dummyStyle is NULL");
                return;
            }

            dummyStyle.cssText = "";
            dummyStyle.setProperty(prop.name, prop.value, prop.important);

            var length = dummyStyle.length;
            for (var k=0; k<length; k++)
            {
                var name = dummyStyle.item(k);

                prop.computed[name] = {
                    overridden: false
                };

                if (usedProps.hasOwnProperty(name))
                {
                    var deadProps = usedProps[name];

                    // all previous occurrences of this property
                    for (var j=0; j<deadProps.length; j++)
                    {
                        var deadProp = deadProps[j];

                        // xxxHonza: fix for issue 3009, cross out even inherited properties
                        //if (deadProp.wasInherited)
                        //    continue;

                        if (!deadProp.disabled && deadProp.important && !prop.important)
                        {
                            // new occurrence overridden
                            prop.overridden = true;

                            // Remember what exact shorthand property has been overridden.
                            // This should help when we want to cross out only specific
                            // part of the property value.
                            if (prop.computed.hasOwnProperty(name))
                                prop.computed[name].overridden = true;
                        }
                        else if (!prop.disabled)
                        {
                            // previous occurrences overridden
                            deadProp.overridden = true;

                            if (deadProp.computed.hasOwnProperty(name))
                                deadProp.computed[name].overridden = true;
                        }
                    }
                }
                else
                {
                    usedProps[name] = [];
                }

                // all occurrences of a property seen so far, by name
                usedProps[name].push(prop);
            }

            prop.wasInherited = inheritMode ? true : false;
        }
    },

    removeOverriddenProps: function(rules, sections)
    {
        function removeProps(rules)
        {
            var i=0;
            while (i<rules.length)
            {
                var props = rules[i].props;

                var j=0;
                while (j<props.length)
                {
                    if (props[j].overridden)
                        props.splice(j, 1);
                    else
                        ++j;
                }

                if (props.length == 0)
                    rules.splice(i, 1);
                else
                    ++i;
            }
        }

        removeProps(rules);

        var i=0;
        while (i < sections.length)
        {
            var section = sections[i];
            removeProps(section.rules);

            if (section.rules.length == 0)
                sections.splice(i, 1);
            else
                ++i;
        }
    },

    removeSystemRules: function(rules, sections)
    {
        function removeSystem(rules)
        {
            var i=0;
            while (i<rules.length)
            {
                if (rules[i].isSystemSheet)
                    rules.splice(i, 1);
                else
                    ++i;
            }
        }

        removeSystem(rules);

        var i=0;
        while (i<sections.length)
        {
            var section = sections[i];
            removeSystem(section.rules);

            if (section.rules.length == 0)
                sections.splice(i, 1);
            else
                ++i;
        }
    },

    getStyleProperties: function(element, rules, usedProps, inheritMode)
    {
        var props = this.parseCSSProps(element.style, inheritMode);
        this.addOldProperties(this.context, Xpath.getElementXPath(element), inheritMode, props);

        this.sortProperties(props);

        this.markOverriddenProps(element, props, usedProps, inheritMode);

        if (props.length)
        {
            rules.unshift({rule: element, id: Xpath.getElementXPath(element),
                    selector: "element.style", props: props, inherited: inheritMode});
        }
    },

    inspectDeclaration: function(rule)
    {
        Firebug.chrome.select(rule, "stylesheet");
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // extends Panel

    name: "css",
    parentPanel: "html",
    order: 0,

    initialize: function()
    {
        this.onStateChange = Obj.bindFixed(this.contentStateCheck, this);
        this.onHoverChange = Obj.bindFixed(this.contentStateCheck, this, STATE_HOVER);
        this.onActiveChange = Obj.bindFixed(this.contentStateCheck, this, STATE_ACTIVE);

        CSSStyleSheetPanel.prototype.initialize.apply(this, arguments);
    },

    show: function(state)
    {
        if (this.selection)
            this.refresh();
    },

    watchWindow: function(context, win)
    {
        if (Dom.domUtils)
        {
            // Normally these would not be required, but in order to update after the state is set
            // using the options menu we need to monitor these global events as well
            context.addEventListener(win, "mouseover", this.onHoverChange, false);
            context.addEventListener(win, "mousedown", this.onActiveChange, false);
        }
    },

    unwatchWindow: function(context, win)
    {
        context.removeEventListener(win, "mouseover", this.onHoverChange, false);
        context.removeEventListener(win, "mousedown", this.onActiveChange, false);

        var doc = win.document;
        if (Dom.isAncestor(this.stateChangeEl, doc))
            this.removeStateChangeHandlers();
    },

    supportsObject: function(object, type)
    {
        return object instanceof window.Element ? 1 : 0;
    },

    updateView: function(element)
    {
        CSSModule.cleanupSheets(element.ownerDocument, Firebug.currentContext);

        this.updateCascadeView(element);

        if (Dom.domUtils)
        {
            this.contentState = safeGetContentState(element);
            this.addStateChangeHandlers(element);
        }
    },

    updateSelection: function(element)
    {
        if (!(element instanceof window.Element)) // html supports SourceLink
            return;

        var sothinkInstalled = !!Firefox.getElementById("swfcatcherKey_sidebar");
        if (sothinkInstalled)
        {
            var div = FirebugReps.Warning.tag.replace({object: "SothinkWarning"}, this.panelNode);
            div.innerHTML = Locale.$STR("SothinkWarning");
            return;
        }

        this.updateView(element);
    },

    updateOption: function(name, value)
    {
        var options = new Set();
        options.add("onlyShowAppliedStyles");
        options.add("showUserAgentCSS");
        options.add("expandShorthandProps");
        options.add("colorDisplay");
        options.add("showMozillaSpecificStyles");

        if (options.has(name))
            this.refresh();
    },

    getOptionsMenuItems: function()
    {
        var items = [
            Menu.optionMenu("Only_Show_Applied_Styles", "onlyShowAppliedStyles",
                "style.option.tip.Only_Show_Applied_Styles"),
            Menu.optionMenu("Show_User_Agent_CSS", "showUserAgentCSS",
                "style.option.tip.Show_User_Agent_CSS"),
            Menu.optionMenu("Expand_Shorthand_Properties", "expandShorthandProps",
                "css.option.tip.Expand_Shorthand_Properties")
        ];

        items = Arr.extendArray(items, CSSModule.getColorDisplayOptionMenuItems());

        if (Dom.domUtils && this.selection)
        {
            var self = this;

            items.push(
                "-",
                {
                    label: "style.option.label.hover",
                    type: "checkbox",
                    checked: self.hasPseudoClassLock(":hover"),
                    tooltiptext: "style.option.tip.hover",
                    command: function()
                    {
                        self.togglePseudoClassLock(":hover");
                    }
                },
                {
                    label: "style.option.label.active",
                    type: "checkbox",
                    checked: self.hasPseudoClassLock(":active"),
                    tooltiptext: "style.option.tip.active",
                    command: function()
                    {
                        self.togglePseudoClassLock(":active");
                    }
                }
            );
            if (Dom.domUtils.hasPseudoClassLock)
            {
                items.push(
                    {
                        label: "style.option.label.focus",
                        type: "checkbox",
                        checked: self.hasPseudoClassLock(":focus"),
                        tooltiptext: "style.option.tip.focus",
                        command: function()
                        {
                            self.togglePseudoClassLock(":focus");
                        }
                    }
                );
            }
        }

        return items;
    },

    getContextMenuItems: function(style, target)
    {
        var items = CSSStyleSheetPanel.prototype.getContextMenuItems(style, target);
        var insertIndex = 0;

        for (var i = 0; i < items.length; ++i)
        {
            if (items[i].id == "fbNewCSSRule")
            {
                items.splice(i, 1);
                insertIndex = i;
                break;
            }
        }

        items.splice(insertIndex, 0, {
            label: "EditStyle",
            tooltiptext: "style.tip.Edit_Style",
            command: Obj.bindFixed(this.editElementStyle, this)
        },
        {
            label: "AddRule",
            tooltiptext: "style.tip.Add_Rule",
            command: Obj.bindFixed(this.addRelatedRule, this)
        });

        if (style instanceof Ci.nsIDOMFontFace && style.rule)
        {
            items.push(
                "-",
                {
                    label: "css.label.Inspect_Declaration",
                    tooltiptext: "css.tip.Inspect_Declaration",
                    id: "fbInspectDeclaration",
                    command: Obj.bindFixed(this.inspectDeclaration, this, style.rule)
                }
            );
        }

        return items;
    },

    showInfoTip: function(infoTip, target, x, y, rangeParent, rangeOffset)
    {
        var prop = Dom.getAncestorByClass(target, "cssProp");
        if (prop)
            var propNameNode = prop.getElementsByClassName("cssPropName").item(0);
  
        if (propNameNode && (propNameNode.textContent.toLowerCase() == "font" ||
            propNameNode.textContent.toLowerCase() == "font-family"))
        {
            var prevSibling = target.previousElementSibling;
            while (prevSibling)
            {
                rangeOffset += prevSibling.textContent.length;
                prevSibling = prevSibling.previousElementSibling;
            }
        }

        return CSSStyleSheetPanel.prototype.showInfoTip.call(this, infoTip, target, x, y, rangeParent, rangeOffset);
    },

    hasPseudoClassLock: function(pseudoClass)
    {
        if (Dom.domUtils.hasPseudoClassLock)
        {
            return Dom.domUtils.hasPseudoClassLock(this.selection, pseudoClass);
        }
        else
        {
            // Fallback in case the new pseudo-class lock API isn't available
            var state = safeGetContentState(this.selection);
            switch(pseudoClass)
            {
                case ":active":
                    return state & STATE_ACTIVE;

                case ":hover":
                    return state & STATE_HOVER;
            }
        }
    },

    togglePseudoClassLock: function(pseudoClass)
    {
        if (FBTrace.DBG_CSS)
            FBTrace.sysout("css.togglePseudoClassLock; pseudo-class: " + pseudoClass);

        if (Dom.domUtils.hasPseudoClassLock)
        {
            if (Dom.domUtils.hasPseudoClassLock(this.selection, pseudoClass))
                Dom.domUtils.removePseudoClassLock(this.selection, pseudoClass);
            else
                Dom.domUtils.addPseudoClassLock(this.selection, pseudoClass);
        }
        else
        {
            // Fallback in case the new pseudo-class lock API isn't available
            var currentState = safeGetContentState(this.selection);
            var remove = false;
            switch(pseudoClass)
            {
                case ":active":
                    state = STATE_ACTIVE;
                    break;

                case ":hover":
                    state = STATE_HOVER;
                    break;
            }
            remove = currentState & state;

            Dom.domUtils.setContentState(remove ? this.selection.ownerDocument.documentElement :
                this.selection, state);
        }

        this.refresh();
    },

    clearPseudoClassLocks: function()
    {
        if (Dom.domUtils.clearPseudoClassLocks)
            Dom.domUtils.clearPseudoClassLocks(this.selection);
    },

    addStateChangeHandlers: function(el)
    {
        this.removeStateChangeHandlers();

        Events.addEventListener(el, "focus", this.onStateChange, true);
        Events.addEventListener(el, "blur", this.onStateChange, true);
        Events.addEventListener(el, "mouseup", this.onStateChange, false);
        Events.addEventListener(el, "mousedown", this.onStateChange, false);
        Events.addEventListener(el, "mouseover", this.onStateChange, false);
        Events.addEventListener(el, "mouseout", this.onStateChange, false);

        this.stateChangeEl = el;
    },

    removeStateChangeHandlers: function()
    {
        var sel = this.stateChangeEl;
        if (sel)
        {
            Events.removeEventListener(sel, "focus", this.onStateChange, true);
            Events.removeEventListener(sel, "blur", this.onStateChange, true);
            Events.removeEventListener(sel, "mouseup", this.onStateChange, false);
            Events.removeEventListener(sel, "mousedown", this.onStateChange, false);
            Events.removeEventListener(sel, "mouseover", this.onStateChange, false);
            Events.removeEventListener(sel, "mouseout", this.onStateChange, false);
        }

        this.stateChangeEl = null;
    },

    contentStateCheck: function(state)
    {
        if (!state || this.contentState & state)
        {
            var timeoutRunner = Obj.bindFixed(function()
            {
                var newState = safeGetContentState(this.selection);
                if (newState != this.contentState)
                {
                    this.context.invalidatePanels(this.name);
                }
            }, this);

            // Delay exec until after the event has processed and the state has been updated
            setTimeout(timeoutRunner, 0);
      }
    }
});

// ********************************************************************************************* //
// Helpers

function safeGetContentState(selection)
{
    try
    {
        if (selection && selection.ownerDocument)
            return Dom.domUtils.getContentState(selection);
    }
    catch (e)
    {
        if (FBTrace.DBG_ERRORS && FBTrace.DBG_CSS)
            FBTrace.sysout("css.safeGetContentState; EXCEPTION "+e, e);
    }
}

function getFontPropValueParts(element, value, propName)
{
    const genericFontFamilies =
    {
        "serif": 1,
        "sans-serif": 1,
        "cursive": 1,
        "fantasy": 1,
        "monospace": 1,
    };

    var parts = [];

    // (Mirroring CSSModule.parseCSSFontFamilyValue)
    if (propName === "font")
    {
        var rePreFont = new RegExp(
            "^.*" + // anything, then
            "(" +
                "\\d+(\\.\\d+)?([a-z]*|%)|" + // a number (with possible unit)
                "(x{1,2}-)?(small|large)|medium|larger|smaller" + // or an named size description
            ") "
        );
        var matches = rePreFont.exec(value);
        if (!matches)
            return;
        var preProps = matches[0].slice(0, -1);
        parts.push({type: "otherProps", value: preProps});
        value = value.substr(matches[0].length);
    }

    var matches = /^(.*?)( !important)?$/.exec(value);
    var fonts = matches[1].split(",");

    // Clone the element to just get the fonts used in it and not its descendants
    var clonedElement = element.cloneNode(false);
    clonedElement.textContent = element.textContent;
    Firebug.setIgnored(clonedElement);
    element.parentNode.appendChild(clonedElement);
    var usedFonts = Fonts.getFonts(clonedElement).slice();
    clonedElement.parentNode.removeChild(clonedElement);

    var genericFontUsed = false;
    for (var i = 0; i < fonts.length; ++i)
    {
        var font = fonts[i].replace(/^["'](.*)["']$/, "$1").toLowerCase();
        var isGeneric = genericFontFamilies.hasOwnProperty(font);
        var isUsedFont = false;

        for (var j = 0; j < usedFonts.length; ++j)
        {
            var usedFont = usedFonts[j].CSSFamilyName.toLowerCase();
            if (font == usedFont || (isGeneric && !genericFontUsed))
            {
                parts.push({type: "used", value: fonts[i], font: usedFonts[j]});
                usedFonts.splice(j, 1);

                isUsedFont = true;
                if (isGeneric)
                    genericFontUsed = true;
                break;
            }
        }

        if (!isUsedFont)
            parts.push({type: "unused", value: fonts[i]});
    }

    // xxxsz: Domplate doesn't allow to check for the last element in an array yet,
    // so use this as hack
    parts[parts.length-1].lastFont = true;

    if (matches[2])
        parts.push({type: "important", value: " !important"});

    return parts;
}

// ********************************************************************************************* //
// Registration

Firebug.registerPanel(CSSStylePanel);

return CSSStylePanel;

// ********************************************************************************************* //
}}