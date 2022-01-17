function()
    {
        this._registerAutosubscriptionHandler(WebInspector.extensionAPI.Events.ConsoleMessageAdded,
            WebInspector.console, WebInspector.ConsoleModel.Events.MessageAdded, this._notifyConsoleMessageAdded);
        this._registerAutosubscriptionHandler(WebInspector.extensionAPI.Events.NetworkRequestFinished,
            WebInspector.networkManager, WebInspector.NetworkManager.EventTypes.RequestFinished, this._notifyRequestFinished);
        this._registerAutosubscriptionHandler(WebInspector.extensionAPI.Events.ResourceAdded,
            WebInspector.workspace,
            WebInspector.UISourceCodeProvider.Events.UISourceCodeAdded,
            this._notifyResourceAdded);
        if (WebInspector.panels.elements) {
            this._registerAutosubscriptionHandler(WebInspector.extensionAPI.Events.ElementsPanelObjectSelected,
                WebInspector.panels.elements.treeOutline,
                WebInspector.ElementsTreeOutline.Events.SelectedNodeChanged,
                this._notifyElementsSelectionChanged);
        }
        this._registerAutosubscriptionHandler(WebInspector.extensionAPI.Events.ResourceContentCommitted,
            WebInspector.resourceTreeModel,
            WebInspector.ResourceTreeModel.EventTypes.ResourceContentCommitted,
            this._notifyResourceContentCommitted);

        function onTimelineSubscriptionStarted()
        {
            WebInspector.timelineManager.addEventListener(WebInspector.TimelineManager.EventTypes.TimelineEventRecorded,
                this._notifyTimelineEventRecorded, this);
            WebInspector.timelineManager.start();
        }
        function onTimelineSubscriptionStopped()
        {
            WebInspector.timelineManager.stop();
            WebInspector.timelineManager.removeEventListener(WebInspector.TimelineManager.EventTypes.TimelineEventRecorded,
                this._notifyTimelineEventRecorded, this);
        }
        this._registerSubscriptionHandler(WebInspector.extensionAPI.Events.TimelineEventRecorded,
            onTimelineSubscriptionStarted.bind(this), onTimelineSubscriptionStopped.bind(this));

        WebInspector.resourceTreeModel.addEventListener(WebInspector.ResourceTreeModel.EventTypes.InspectedURLChanged,
            this._inspectedURLChanged, this);
        WebInspector.resourceTreeModel.addEventListener(WebInspector.ResourceTreeModel.EventTypes.MainFrameNavigated, this._mainFrameNavigated, this);
        InspectorExtensionRegistry.getExtensionsAsync();
    }