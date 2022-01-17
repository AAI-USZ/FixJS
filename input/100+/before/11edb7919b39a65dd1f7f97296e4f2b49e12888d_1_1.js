function defineCommonExtensionSymbols(apiPrivate)
{
    if (!apiPrivate.audits)
        apiPrivate.audits = {};
    apiPrivate.audits.Severity = {
        Info: "info",
        Warning: "warning",
        Severe: "severe"
    };

    if (!apiPrivate.console)
        apiPrivate.console = {};
    apiPrivate.console.Severity = {
        Tip: "tip",
        Debug: "debug",
        Log: "log",
        Warning: "warning",
        Error: "error"
    };

    if (!apiPrivate.panels)
        apiPrivate.panels = {};
    apiPrivate.panels.SearchAction = {
        CancelSearch: "cancelSearch",
        PerformSearch: "performSearch",
        NextSearchResult: "nextSearchResult",
        PreviousSearchResult: "previousSearchResult"
    };

    apiPrivate.Events = {
        AuditStarted: "audit-started-",
        ButtonClicked: "button-clicked-",
        ConsoleMessageAdded: "console-message-added",
        ElementsPanelObjectSelected: "panel-objectSelected-elements",
        NetworkRequestFinished: "network-request-finished",
        Reset: "reset",
        OpenResource: "open-resource",
        PanelSearch: "panel-search-",
        Reload: "Reload",
        ResourceAdded: "resource-added",
        ResourceContentCommitted: "resource-content-committed",
        TimelineEventRecorded: "timeline-event-recorded",
        ViewShown: "view-shown-",
        ViewHidden: "view-hidden-"
    };

    apiPrivate.Commands = {
        AddAuditCategory: "addAuditCategory",
        AddAuditResult: "addAuditResult",
        AddConsoleMessage: "addConsoleMessage",
        AddRequestHeaders: "addRequestHeaders",
        CreatePanel: "createPanel",
        CreateSidebarPane: "createSidebarPane",
        CreateStatusBarButton: "createStatusBarButton",
        EvaluateOnInspectedPage: "evaluateOnInspectedPage",
        GetConsoleMessages: "getConsoleMessages",
        GetHAR: "getHAR",
        GetPageResources: "getPageResources",
        GetRequestContent: "getRequestContent",
        GetResourceContent: "getResourceContent",
        Subscribe: "subscribe",
        SetOpenResourceHandler: "setOpenResourceHandler",
        SetResourceContent: "setResourceContent",
        SetSidebarContent: "setSidebarContent",
        SetSidebarHeight: "setSidebarHeight",
        SetSidebarPage: "setSidebarPage",
        ShowPanel: "showPanel",
        StopAuditCategoryRun: "stopAuditCategoryRun",
        Unsubscribe: "unsubscribe",
        UpdateButton: "updateButton",
        InspectedURLChanged: "inspectedURLChanged"
    };
}