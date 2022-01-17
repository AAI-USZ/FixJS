function()
{
    this._clientObjects = {};
    this._handlers = {};
    this._subscribers = {};
    this._subscriptionStartHandlers = {};
    this._subscriptionStopHandlers = {};
    this._extraHeaders = {};
    this._requests = {};
    this._lastRequestId = 0;
    this._registeredExtensions = {};
    this._status = new WebInspector.ExtensionStatus();

    var commands = WebInspector.extensionAPI.Commands;

    this._registerHandler(commands.AddAuditCategory, this._onAddAuditCategory.bind(this));
    this._registerHandler(commands.AddAuditResult, this._onAddAuditResult.bind(this));
    this._registerHandler(commands.AddConsoleMessage, this._onAddConsoleMessage.bind(this));
    this._registerHandler(commands.AddRequestHeaders, this._onAddRequestHeaders.bind(this));
    this._registerHandler(commands.CreatePanel, this._onCreatePanel.bind(this));
    this._registerHandler(commands.CreateSidebarPane, this._onCreateSidebarPane.bind(this));
    this._registerHandler(commands.CreateStatusBarButton, this._onCreateStatusBarButton.bind(this));
    this._registerHandler(commands.EvaluateOnInspectedPage, this._onEvaluateOnInspectedPage.bind(this));
    this._registerHandler(commands.GetHAR, this._onGetHAR.bind(this));
    this._registerHandler(commands.GetConsoleMessages, this._onGetConsoleMessages.bind(this));
    this._registerHandler(commands.GetPageResources, this._onGetPageResources.bind(this));
    this._registerHandler(commands.GetRequestContent, this._onGetRequestContent.bind(this));
    this._registerHandler(commands.GetResourceContent, this._onGetResourceContent.bind(this));
    this._registerHandler(commands.Log, this._onLog.bind(this));
    this._registerHandler(commands.Reload, this._onReload.bind(this));
    this._registerHandler(commands.SendCommand, this._onSendCommand.bind(this));
    this._registerHandler(commands.SetOpenResourceHandler, this._onSetOpenResourceHandler.bind(this));
    this._registerHandler(commands.SetResourceContent, this._onSetResourceContent.bind(this));
    this._registerHandler(commands.SetSidebarHeight, this._onSetSidebarHeight.bind(this));
    this._registerHandler(commands.SetSidebarContent, this._onSetSidebarContent.bind(this));
    this._registerHandler(commands.SetSidebarPage, this._onSetSidebarPage.bind(this));
    this._registerHandler(commands.ShowPanel, this._onShowPanel.bind(this));
    this._registerHandler(commands.StopAuditCategoryRun, this._onStopAuditCategoryRun.bind(this));
    this._registerHandler(commands.Subscribe, this._onSubscribe.bind(this));
    this._registerHandler(commands.Unsubscribe, this._onUnsubscribe.bind(this));
    this._registerHandler(commands.UpdateButton, this._onUpdateButton.bind(this));

    window.addEventListener("message", this._onWindowMessage.bind(this), false);
}