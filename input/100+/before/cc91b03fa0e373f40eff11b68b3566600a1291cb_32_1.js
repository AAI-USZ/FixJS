function(Obj, Firebug, Xpcom, Events, Url, Css, Win, Xml, Options) {

// ********************************************************************************************* //
// Constants

const Cc = Components.classes;
const Ci = Components.interfaces;

const reSplitCSS = /(url\("?[^"\)]+"?\)?)|(rgba?\([^)]*\)?)|(hsla?\([^)]*\)?)|(#[\dA-Fa-f]+)|(-?\d+(\.\d+)?(%|[a-z]{1,4})?)|"([^"]*)"?|'([^']*)'?|([^,\s\/!\(\)]+)|(!(.*)?)/;
const reURL = /url\("?([^"\)]+)?"?\)/;
const reRepeat = /no-repeat|repeat-x|repeat-y|repeat/;

// ********************************************************************************************* //
// CSS Module

Firebug.CSSModule = Obj.extend(Obj.extend(Firebug.Module, Firebug.EditorSelector),
{
    dispatchName: "cssModule",

    freeEdit: function(styleSheet, value)
    {
        if (FBTrace.DBG_CSS)
            FBTrace.sysout("CSSModule.freeEdit", arguments);

        if (!styleSheet.editStyleSheet)
        {
            var ownerNode = getStyleSheetOwnerNode(styleSheet);
            styleSheet.disabled = true;

            var url = Xpcom.CCSV("@mozilla.org/network/standard-url;1", Ci.nsIURL);
            url.spec = styleSheet.href;

            var editStyleSheet = ownerNode.ownerDocument.createElementNS(
                "http://www.w3.org/1999/xhtml",
                "style");

            Firebug.setIgnored(editStyleSheet);

            editStyleSheet.setAttribute("type", "text/css");
            editStyleSheet.setAttributeNS(
                "http://www.w3.org/XML/1998/namespace",
                "base",
                url.directory);

            if (ownerNode.hasAttribute("media"))
                editStyleSheet.setAttribute("media", ownerNode.getAttribute("media"));

            // Insert the edited stylesheet directly after the old one to ensure the styles
            // cascade properly.
            ownerNode.parentNode.insertBefore(editStyleSheet, ownerNode.nextSibling);

            styleSheet.editStyleSheet = editStyleSheet;
        }

        styleSheet.editStyleSheet.innerHTML = value;

        if (FBTrace.DBG_CSS)
            FBTrace.sysout("css.saveEdit styleSheet.href:" + styleSheet.href +
                " got innerHTML:" + value);

        Events.dispatch(this.fbListeners, "onCSSFreeEdit", [styleSheet, value]);
    },

    insertRule: function(styleSheet, cssText, ruleIndex)
    {
        if (FBTrace.DBG_CSS)
            FBTrace.sysout("Insert: " + ruleIndex + " " + cssText);

        var insertIndex = styleSheet.insertRule(cssText, ruleIndex);

        Events.dispatch(this.fbListeners, "onCSSInsertRule", [styleSheet, cssText, ruleIndex]);

        return insertIndex;
    },

    deleteRule: function(styleSheet, ruleIndex)
    {
        if (FBTrace.DBG_CSS)
            FBTrace.sysout("deleteRule: " + ruleIndex + " " + styleSheet.cssRules.length,
                styleSheet.cssRules);

        Events.dispatch(this.fbListeners, "onCSSDeleteRule", [styleSheet, ruleIndex]);

        styleSheet.deleteRule(ruleIndex);
    },

    setProperty: function(rule, propName, propValue, propPriority)
    {
        var style = rule.style || rule;

        // Record the original CSS text for the inline case so we can reconstruct at a later
        // point for diffing purposes
        var baseText = style.cssText;

        var prevValue = style.getPropertyValue(propName);
        var prevPriority = style.getPropertyPriority(propName);

        // XXXjoe Gecko bug workaround: Just changing priority doesn't have any effect
        // unless we remove the property first
        style.removeProperty(propName);

        style.setProperty(propName, propValue, propPriority);

        if (propName)
        {
            Events.dispatch(this.fbListeners, "onCSSSetProperty", [style, propName, propValue,
                propPriority, prevValue, prevPriority, rule, baseText]);
        }
    },

    removeProperty: function(rule, propName, parent)
    {
        var style = rule.style || rule;

        // Record the original CSS text for the inline case so we can reconstruct at a later
        // point for diffing purposes
        var baseText = style.cssText;

        var prevValue = style.getPropertyValue(propName);
        var prevPriority = style.getPropertyPriority(propName);

        style.removeProperty(propName);

        if (propName)
            Events.dispatch(this.fbListeners, "onCSSRemoveProperty", [style, propName, prevValue,
                prevPriority, rule, baseText]);
    },

    /**
     * Method for atomic propertly removal, such as through the context menu.
     */
    deleteProperty: function(rule, propName, context)
    {
        Events.dispatch(this.fbListeners, "onBeginFirebugChange", [rule, context]);
        Firebug.CSSModule.removeProperty(rule, propName);
        Events.dispatch(this.fbListeners, "onEndFirebugChange", [rule, context]);
    },

    disableProperty: function(disable, rule, propName, parsedValue, map, context)
    {
        Events.dispatch(this.fbListeners, "onBeginFirebugChange", [rule, context]);

        if (disable)
        {
            Firebug.CSSModule.removeProperty(rule, propName);

            map.push({"name": propName, "value": parsedValue.value,
                "important": parsedValue.priority});
        }
        else
        {
            Firebug.CSSModule.setProperty(rule, propName, parsedValue.value, parsedValue.priority);

            var index = findPropByName(map, propName);
            map.splice(index, 1);
        }

        Events.dispatch(this.fbListeners, "onEndFirebugChange", [rule, context]);
    },

    cleanupSheets: function(doc, context)
    {
        if (!context)
            return;

        // Due to the manner in which the layout engine handles multiple
        // references to the same sheet we need to kick it a little bit.
        // The injecting a simple stylesheet then removing it will force
        // Firefox to regenerate it's CSS hierarchy.
        //
        // WARN: This behavior was determined anecdotally.
        // See http://code.google.com/p/fbug/issues/detail?id=2440

        // This causes additional HTTP request for a font (see 4649).
        /*if (!Xml.isXMLPrettyPrint(context))
        {
            var style = Css.createStyleSheet(doc);
            style.innerHTML = "#fbIgnoreStyleDO_NOT_USE {}";
            Css.addStyleSheet(doc, style);

            if (style.parentNode)
            {
                style.parentNode.removeChild(style);
            }
            else
            {
                if (FBTrace.DBG_ERRORS)
                    FBTrace.sysout("css.cleanupSheets; ERROR no parent style:", style);
            }
        }*/

        // https://bugzilla.mozilla.org/show_bug.cgi?id=500365
        // This voodoo touches each style sheet to force some Firefox internal change
        // to allow edits.
        var styleSheets = Css.getAllStyleSheets(context);
        for(var i = 0; i < styleSheets.length; i++)
        {
            try
            {
                var rules = styleSheets[i].cssRules;
                if (rules.length > 0)
                    var touch = rules[0];

                //if (FBTrace.DBG_CSS && touch)
                //    FBTrace.sysout("css.show() touch "+typeof(touch)+" in "+
                //        (styleSheets[i].href?styleSheets[i].href:context.getName()));
            }
            catch(e)
            {
                if (FBTrace.DBG_ERRORS)
                    FBTrace.sysout("css.show: sheet.cssRules FAILS for "+
                        (styleSheets[i]?styleSheets[i].href:"null sheet")+e, e);
            }
        }
    },

    cleanupSheetHandler: function(event, context)
    {
        var target = event.target,
            tagName = (target.tagName || "").toLowerCase();

        if (tagName == "link")
        {
            this.cleanupSheets(target.ownerDocument, context);
        }
    },

    parseCSSValue: function(value, offset)
    {
        var start = 0;
        var m;
        while (true)
        {
            m = reSplitCSS.exec(value);
            if (m && m.index+m[0].length < offset)
            {
                value = value.substr(m.index+m[0].length);
                start += m.index+m[0].length;
                offset -= m.index+m[0].length;
            }
            else
                break;
        }

        if (!m)
            return;

        var type;
        if (m[1])
            type = "url";
        else if (m[2] || m[4])
            type = "rgb";
        else if (m[3])
            type = "hsl";
        else if (m[5])
            type = "int";

        var cssValue = {value: m[0], start: start+m.index, end: start+m.index+m[0].length, type: type};

        if (!type)
        {
            if (m[10] && m[10].indexOf("gradient") != -1)
            {
                var arg = value.substr(m[0].length).match(/\((?:(?:[^\(\)]*)|(?:\(.*?\)))+\)/);
                if (!arg)
                  return;

                cssValue.value += arg[0];
                cssValue.type = "gradient";
            }
            else if (Css.isColorKeyword(cssValue.value))
            {
                cssValue.type = "colorKeyword";
            }
        }

        return cssValue;
    },

    parseCSSFontFamilyValue: function(value, offset, propName)
    {
        var skipped = 0;
        if (propName === "font")
        {
            var rePreFont = new RegExp(
                "^.*" + // anything, then
                "(" +
                    "\\d+(\\.\\d+)?([a-z]*|%)|" + // a number (with possible unit)
                    "(x{1,2}-)?(small|large)|medium|larger|smaller" + // or an named size description
                ") "
            );
            var m = rePreFont.exec(value);
            if (!m || offset < m[0].length)
                return this.parseCSSValue(value, offset);
            skipped = m[0].length;
            value = value.substr(skipped);
            offset -= skipped;
        }

        var matches = /^(.*?)(\s*!.*)?$/.exec(value);
        var fonts = matches[1].split(",");

        var totalLength = 0;
        for (var i = 0; i < fonts.length; ++i)
        {
            totalLength += fonts[i].length;
            if (offset <= totalLength)
            {
                // Give back the value and location of this font, whitespace-trimmed.
                var font = fonts[i].replace(/^\s+/, "");
                var end = totalLength;
                var start = end - font.length;
                return {
                    value: font,
                    start: start + skipped,
                    end: end + skipped,
                    type: "fontFamily"
                };
            }

            // include ","
            ++totalLength;
        }

        // Parse !important.
        var ret = this.parseCSSValue(value, offset);
        if (ret)
        {
            ret.start += skipped;
            ret.end += skipped;
        }
        return ret;
    },

    parseURLValue: function(value)
    {
        var m = reURL.exec(value);
        return m ? m[1] : "";
    },

    parseRepeatValue: function(value)
    {
        var m = reRepeat.exec(value);
        return m ? m[0] : "";
    },

    getPropertyInfo: function(computedStyle, propName)
    {
        var propInfo = {
            property: propName,
            value: computedStyle.getPropertyValue(propName),
            matchedSelectors: [],
            matchedRuleCount: 0
        };

        return propInfo;
    },

    getColorDisplayOptionMenuItems: function()
    {
        return [
            "-",
            {
                label: "computed.option.label.Colors_As_Hex",
                tooltiptext: "computed.option.tip.Colors_As_Hex",
                type: "radio",
                name: "colorDisplay",
                id: "colorDisplayHex",
                command: function() {
                    return Options.set("colorDisplay", "hex");
                },
                checked: Options.get("colorDisplay") == "hex"
            },
            {
                label: "computed.option.label.Colors_As_RGB",
                tooltiptext: "computed.option.tip.Colors_As_RGB",
                type: "radio",
                name: "colorDisplay",
                id: "colorDisplayRGB",
                command: function() {
                    return Options.set("colorDisplay", "rgb");
                },
                checked: Options.get("colorDisplay") == "rgb"
            },
            {
                label: "computed.option.label.Colors_As_HSL",
                tooltiptext: "computed.option.tip.Colors_As_HSL",
                type: "radio",
                name: "colorDisplay",
                id: "colorDisplayHSL",
                command: function() {
                    return Options.set("colorDisplay", "hsl");
                },
                checked: Options.get("colorDisplay") == "hsl"
            }
        ];
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Module functions

    initialize: function()
    {
        this.editors = {};
        this.registerEditor("Live",
        {
            startEditing: function(stylesheet, context, panel)
            {
                panel.startLiveEditing(stylesheet, context);
            },
            stopEditing: function()
            {
                Firebug.Editor.stopEditing();
            }
        });

        this.registerEditor("Source",
        {
            startEditing: function(stylesheet, context, panel)
            {
                panel.startSourceEditing(stylesheet, context);
            },
            stopEditing: function()
            {
                Firebug.Editor.stopEditing();
            }
        });
    },

    watchWindow: function(context, win)
    {
        var doc = win.document;
        this.cleanupSheetListener= Obj.bind(this.cleanupSheetHandler, this, context);

        context.addEventListener(doc, "DOMAttrModified", this.cleanupSheetListener, false);
        context.addEventListener(doc, "DOMNodeInserted", this.cleanupSheetListener, false);
    },

    unwatchWindow: function(context, win)
    {
        var doc = win.document;

        if (this.cleanupSheetListener)
        {
            context.removeEventListener(doc, "DOMAttrModified", this.cleanupSheetListener, false);
            context.removeEventListener(doc, "DOMNodeInserted", this.cleanupSheetListener, false);
        }
    },

    loadedContext: function(context)
    {
        var self = this;
        Win.iterateWindows(context.browser.contentWindow, function(subwin)
        {
            self.cleanupSheets(subwin.document, context);
        });
    },

    initContext: function(context)
    {
        context.dirtyListener = new Firebug.CSSDirtyListener(context);
        this.addListener(context.dirtyListener);
    },

    destroyContext: function(context)
    {
        this.removeListener(context.dirtyListener);
    }
});

// ********************************************************************************************* //
// Helpers

function getStyleSheetOwnerNode(sheet)
{
    for (; sheet && !sheet.ownerNode; sheet = sheet.parentStyleSheet);

    return sheet.ownerNode;
}

function findPropByName(props, name)
{
    for (var i = 0; i < props.length; ++i)
    {
        if (props[i].name == name)
            return i;
    }
}

// ********************************************************************************************* //
// Registration

Firebug.registerModule(Firebug.CSSModule);

return Firebug.CSSModule;

// ********************************************************************************************* //
}