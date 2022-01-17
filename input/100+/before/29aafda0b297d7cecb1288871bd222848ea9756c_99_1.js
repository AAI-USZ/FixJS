function factoryOptions(Events, FBTrace) {

// ********************************************************************************************* //
// Constants

const Cc = Components.classes;
const Ci = Components.interfaces;

const nsIPrefBranch = Ci.nsIPrefBranch;
const nsIPrefBranch2 = Ci.nsIPrefBranch2;
const PrefService = Cc["@mozilla.org/preferences-service;1"];

const nsIPrefService = Ci.nsIPrefService;
const prefService = PrefService.getService(nsIPrefService);
const prefs = PrefService.getService(nsIPrefBranch2);

const prefNames =  // XXXjjb TODO distribute to modules
[
    // Global
    "defaultPanelName", "throttleMessages", "textSize", "showInfoTips",
    "commandEditor", "textWrapWidth", "framePosition", "showErrorCount",
    "activateSameOrigin", "allPagesActivation", "hiddenPanels",
    "panelTabMinWidth", "sourceLinkLabelWidth", "currentVersion",
    "useDefaultLocale", "toolbarCustomizationDone", "addonBarOpened",
    "showBreakNotification", "showStatusIcon", "stringCropLength",
    "showFirstRunPage",

    // Search
    "searchCaseSensitive", "searchGlobal", "searchUseRegularExpression",
    "netSearchHeaders", "netSearchParameters", "netSearchResponseBody",

    // Console
    "showJSErrors", "showJSWarnings", "showCSSErrors", "showXMLErrors",
    "showChromeErrors", "showChromeMessages", "showExternalErrors",
    "showXMLHttpRequests", "showNetworkErrors", "tabularLogMaxHeight",
    "consoleFilterTypes", "alwaysShowCommandLine",

    // HTML
    "showFullTextNodes", "showCommentNodes",
    "showTextNodesWithWhitespace", "entityDisplay",
    "highlightMutations", "expandMutations", "scrollToMutations", "shadeBoxModel",
    "showQuickInfoBox", "displayedAttributeValueLimit", "multiHighlightLimit",

    // CSS
    "onlyShowAppliedStyles",
    "showUserAgentCSS",
    "expandShorthandProps",
    "cssEditMode",
    "colorDisplay",

    // Computed
    "computedStylesDisplay",
    "showMozillaSpecificStyles",

    // Script
    "decompileEvals", "replaceTabs", "maxScriptLineLength",

    // DOM
    "showUserProps", "showUserFuncs", "showDOMProps", "showDOMFuncs", "showDOMConstants",
    "ObjectShortIteratorMax", "showEnumerableProperties", "showOwnProperties",
    "showInlineEventHandlers",

    // Layout
    "showRulers",

    // Net
    "netFilterCategory", "netDisplayedResponseLimit",
    "netDisplayedPostBodyLimit", "netPhaseInterval", "sizePrecision",
    "netParamNameLimit", "netShowPaintEvents", "netShowBFCacheResponses",
    "netHtmlPreviewHeight",

    // JSON Preview
    "sortJsonPreview",

    // Stack
    "omitObjectPathStack",

    "showStackTrace", // Console
    "filterSystemURLs", // Stack
    "breakOnErrors",  "trackThrowCatch" // Script
];

var optionUpdateMap = {};

// ********************************************************************************************* //

/**
 * Interface to preference storage.
 * Panels send commands to request option change.
 * Backend responds with events when the change is accepted.
 */
var Options =
/** @lends Options */
{
    getPrefDomain: function()
    {
        return this.prefDomain;
    },

    initialize: function(prefDomain)
    {
        this.prefDomain = prefDomain;

        if (FBTrace.DBG_INITIALIZE)
            FBTrace.sysout("options.initialize with prefDomain " + this.prefDomain);

        this.initializePrefs();
    },

    shutdown: function()
    {
        prefs.removeObserver(this.prefDomain, this, false);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Custom Listeners

    listeners: [],

    addListener: function(listener)
    {
        this.listeners.push(listener);
    },

    removeListener: function(listener)
    {
        for (var i=0; i<this.listeners.length; ++i)
            if (this.listeners[i] == listener)
                return this.listeners.splice(i, 1);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // nsIPrefObserver

    observe: function(subject, topic, data)
    {
        if (data.indexOf(Options.prefDomain) === -1)
            return;

        var name = data.substr(Options.prefDomain.length+1);  // +1 for .
        var value = this.get(name);

        if (FBTrace.DBG_OPTIONS)
            FBTrace.sysout("options.observe name = value: "+name+"= "+value+"\n");

        this.updatePref(name, value);
    },

    updatePref: function(name, value)
    {
        // Prevent infinite recursion due to pref observer
        if (optionUpdateMap.hasOwnProperty(name))
            return;

        try
        {
            optionUpdateMap[name] = 1;
            Firebug[name] = value;

            Events.dispatch(this.listeners, "updateOption", [name, value]);
        }
        catch (err)
        {
            if (FBTrace.DBG_OPTIONS || FBTrace.DBG_ERRORS)
                FBTrace.sysout("options.updatePref EXCEPTION:" + err, err);
        }
        finally
        {
            delete optionUpdateMap[name];
        }

        if (FBTrace.DBG_OPTIONS)
            FBTrace.sysout("options.updatePref EXIT: "+name+"="+value+"\n");
    },

    register: function(name, value)
    {
        var currentValue = this.getPref(this.prefDomain, name);

        if (FBTrace.DBG_INITIALIZE)
            FBTrace.sysout("registerPreference "+name+" -> "+value+" type "+typeof(value)+
                " with currentValue "+currentValue);

        if (currentValue === undefined)
        {
            // https://developer.mozilla.org/en/Code_snippets/Preferences
            // This is the reason why you should usually pass strings ending with a dot to
            // getBranch(), like prefs.getBranch("accessibility.").
            var defaultBranch = prefService.getDefaultBranch(this.prefDomain+"."); //

            var type = this.getPreferenceTypeByExample(typeof(value));
            if (this.setPreference(name, value, type, defaultBranch))
                return true;
        }

        return false;
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Options
    // TODO support per context options eg break on error

    initializePrefs: function()
    {
        for (var i = 0; i < prefNames.length; ++i)
            Firebug[prefNames[i]] = this.getPref(this.prefDomain, prefNames[i]);

        prefs.addObserver(this.prefDomain, this, false);

        var basePrefNames = prefNames.length;

        for (var i = basePrefNames; i < prefNames.length; ++i)
            Firebug[prefNames[i]] = this.getPref(this.prefDomain, prefNames[i]);

        if (FBTrace.DBG_OPTIONS)
        {
             for (var i = 0; i < prefNames.length; ++i)
             {
                FBTrace.sysout("options.initialize option "+this.prefDomain+"."+prefNames[i]+"="+
                    Firebug[prefNames[i]]+"\n");
             }
        }
    },

    togglePref: function(name)
    {
        this.setPref(Options.prefDomain, name, !Firebug[name]);
    },

    get: function(name)
    {
        return Options.getPref(this.prefDomain, name);
    },

    getPref: function(prefDomain, name)
    {
        var prefName = prefDomain + "." + name;

        var type = prefs.getPrefType(prefName);

        var value;
        if (type == nsIPrefBranch.PREF_STRING)
            value = prefs.getCharPref(prefName);
        else if (type == nsIPrefBranch.PREF_INT)
            value = prefs.getIntPref(prefName);
        else if (type == nsIPrefBranch.PREF_BOOL)
            value = prefs.getBoolPref(prefName);

        if (FBTrace.DBG_OPTIONS)
            FBTrace.sysout("options.getPref "+prefName+" has type "+
                this.getPreferenceTypeName(type)+" and value "+value);

        return value;
    },

    set: function(name, value)
    {
        Options.setPref(Options.prefDomain, name, value);
    },

    /**
     * Set a preference value.
     *
     * @param prefDomain, e.g. "extensions.firebug"
     * @param name Name of the preference (the part after prfDomain without dot)
     * @param value New value for the preference.
     * @param prefType optional pref type useful when adding a new preference.
     */
    setPref: function(prefDomain, name, value, prefType)
    {
        var prefName = prefDomain + "." + name;

        var type = this.getPreferenceTypeByExample((prefType ? prefType : typeof(value)));
        if (!this.setPreference(prefName, value, type, prefs))
            return;

        if (FBTrace.DBG_OPTIONS)
            FBTrace.sysout("options.setPref type="+type+" name="+prefName+" value="+value);
    },

    setPreference: function(prefName, value, type, prefBranch)
    {
        if (FBTrace.DBG_OPTIONS)
            FBTrace.sysout("setPreference "+prefName, {prefName: prefName, value: value});

        if (type == nsIPrefBranch.PREF_STRING)
            prefBranch.setCharPref(prefName, value);
        else if (type == nsIPrefBranch.PREF_INT)
            prefBranch.setIntPref(prefName, value);
        else if (type == nsIPrefBranch.PREF_BOOL)
            prefBranch.setBoolPref(prefName, value);
        else if (type == nsIPrefBranch.PREF_INVALID)
        {
            FBTrace.sysout("options.setPref FAILS: Invalid preference "+prefName+" with type "+
                type+", check that it is listed in defaults/prefs.js");

            return false;
        }

        return true;
    },

    getPreferenceTypeByExample: function(prefType)
    {
        if (prefType)
        {
            if (prefType === typeof("s"))
                var type = nsIPrefBranch.PREF_STRING;
            else if (prefType === typeof(1))
                var type = nsIPrefBranch.PREF_INT;
            else if (prefType === typeof (true))
                var type = nsIPrefBranch.PREF_BOOL;
            else
                var type = nsIPrefBranch.PREF_INVALID;
        }
        else
        {
            var type = prefs.getPrefType(prefName);
        }

        return type;
    },

    getPreferenceTypeName: function(prefType)
    {
        if (prefType == Ci.nsIPrefBranch.PREF_STRING)
            return "string";
        else if (prefType == Ci.nsIPrefBranch.PREF_INT)
            return "int";
        else if (prefType == Ci.nsIPrefBranch.PREF_BOOL)
            return "boolean";
    },

    clearPref: function(prefDomain, name)
    {
        var prefName = prefDomain + "." + name;
        if (prefs.prefHasUserValue(prefName))
            prefs.clearUserPref(prefName);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Firebug UI text zoom

    changeTextSize: function(amt)
    {
        var textSize = Options.get("textSize");
        var newTextSize = textSize + amt;
        if ((newTextSize < 0 && Math.abs(newTextSize) < this.negativeZoomFactors.length) ||
            (newTextSize >= 0 && textSize+amt < this.positiveZoomFactors.length))
        {
            this.setTextSize(textSize+amt);
        }
    },

    setTextSize: function(value)
    {
        var setValue = value;
        if (value >= this.positiveZoomFactors.length)
            setValue = this.positiveZoomFactors[this.positiveZoomFactors.length-1];
        else if (value < 0 && Math.abs(value) >= this.negativeZoomFactors.length)
            setValue = this.negativeZoomFactors[this.negativeZoomFactors.length-1];
        this.set("textSize", setValue);
    },

    positiveZoomFactors: [1, 1.1, 1.2, 1.3, 1.5, 2, 3],
    negativeZoomFactors: [1, 0.95, 0.8, 0.7, 0.5],

    getZoomByTextSize: function(value)
    {
        var zoom = value >= 0 ? this.positiveZoomFactors[value] :
            this.negativeZoomFactors[Math.abs(value)];

        return zoom;
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    /**
     * Resets all Firebug options to default state. Note that every option
     * starting with "extensions.firebug" is considered as a Firebug option.
     *
     * Options starting with DBG_ are intended for Firebug Tracing Console (FBTrace)
     * and ignored (their state is not changed).
     */
    resetAllOptions: function()
    {
        var preferences = prefs.getChildList("extensions.firebug", {});
        for (var i = 0; i < preferences.length; i++)
        {
            if (preferences[i].indexOf("DBG_") == -1)
            {
                if (FBTrace.DBG_OPTIONS)
                    FBTrace.sysout("Clearing option: " + i + ") " + preferences[i]);

                if (prefs.prefHasUserValue(preferences[i]))  // avoid exception
                    prefs.clearUserPref(preferences[i]);
            }
            else
            {
                if (FBTrace.DBG_OPTIONS)
                    FBTrace.sysout("Skipped clearing option: " + i + ") " + preferences[i]);
            }
        }
    },
};

// ********************************************************************************************* //
// Registration

return Options;

// ********************************************************************************************* //
}