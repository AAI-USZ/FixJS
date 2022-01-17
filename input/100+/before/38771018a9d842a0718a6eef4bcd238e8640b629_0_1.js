function()
{
    this._eventSupport = new WebInspector.Object();

    this.colorFormat = this.createSetting("colorFormat", "hex");
    this.consoleHistory = this.createSetting("consoleHistory", []);
    this.debuggerEnabled = this.createSetting("debuggerEnabled", false);
    this.domWordWrap = this.createSetting("domWordWrap", true);
    this.profilerEnabled = this.createSetting("profilerEnabled", false);
    this.eventListenersFilter = this.createSetting("eventListenersFilter", "all");
    this.lastActivePanel = this.createSetting("lastActivePanel", "elements");
    this.lastViewedScriptFile = this.createSetting("lastViewedScriptFile", "application");
    this.monitoringXHREnabled = this.createSetting("monitoringXHREnabled", false);
    this.preserveConsoleLog = this.createSetting("preserveConsoleLog", false);
    this.resourcesLargeRows = this.createSetting("resourcesLargeRows", true);
    this.resourcesSortOptions = this.createSetting("resourcesSortOptions", {timeOption: "responseTime", sizeOption: "transferSize"});
    this.resourceViewTab = this.createSetting("resourceViewTab", "preview");
    this.showInheritedComputedStyleProperties = this.createSetting("showInheritedComputedStyleProperties", false);
    this.showUserAgentStyles = this.createSetting("showUserAgentStyles", true);
    this.watchExpressions = this.createSetting("watchExpressions", []);
    this.breakpoints = this.createSetting("breakpoints", []);
    this.eventListenerBreakpoints = this.createSetting("eventListenerBreakpoints", []);
    this.domBreakpoints = this.createSetting("domBreakpoints", []);
    this.xhrBreakpoints = this.createSetting("xhrBreakpoints", []);
    this.sourceMapsEnabled = this.createSetting("sourceMapsEnabled", false);
    this.cacheDisabled = this.createSetting("cacheDisabled", false);
    this.overrideUserAgent = this.createSetting("overrideUserAgent", "");
    this.userAgent = this.createSetting("userAgent", "");
    this.deviceMetrics = this.createSetting("deviceMetrics", "");
    this.deviceFitWindow = this.createSetting("deviceFitWindow", false);
    this.showScriptFolders = this.createSetting("showScriptFolders", true);
    this.dockToRight = this.createSetting("dockToRight", false);
    this.emulateTouchEvents = this.createSetting("emulateTouchEvents", false);
    this.showPaintRects = this.createSetting("showPaintRects", false);
    this.zoomLevel = this.createSetting("zoomLevel", 0);
    this.savedURLs = this.createSetting("savedURLs", {});
    this.javaScriptDisabled = this.createSetting("javaScriptDisabled", false);
    this.geolocationOverride = this.createSetting("geolocationOverride", "");
    this.geolocationError = this.createSetting("geolocationError", "None");

    // If there are too many breakpoints in a storage, it is likely due to a recent bug that caused
    // periodical breakpoints duplication leading to inspector slowness.
    if (this.breakpoints.get().length > 500000)
        this.breakpoints.set([]);
}