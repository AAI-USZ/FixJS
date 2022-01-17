function()
{
    WebInspector.Panel.call(this, "timeline");
    this.registerRequiredCSS("timelinePanel.css");

    this._model = new WebInspector.TimelineModel();
    this._presentationModel = new WebInspector.TimelinePresentationModel();

    this._overviewPane = new WebInspector.TimelineOverviewPane(this._model);
    this._overviewPane.addEventListener(WebInspector.TimelineOverviewPane.Events.WindowChanged, this._scheduleRefresh.bind(this, false));
    this._overviewPane.addEventListener(WebInspector.TimelineOverviewPane.Events.ModeChanged, this._timelinesOverviewModeChanged, this);
    this._overviewPane.show(this.element);

    this.element.addEventListener("contextmenu", this._contextMenu.bind(this), true);
    this.element.tabIndex = 0;

    this._sidebarBackgroundElement = document.createElement("div");
    this._sidebarBackgroundElement.className = "sidebar split-view-sidebar-left timeline-sidebar-background";
    this.element.appendChild(this._sidebarBackgroundElement);

    this.createSplitViewWithSidebarTree();
    this._containerElement = this.splitView.element;
    this._containerElement.id = "timeline-container";
    this._containerElement.addEventListener("scroll", this._onScroll.bind(this), false);

    this._timelineMemorySplitter = this.element.createChild("div");
    this._timelineMemorySplitter.id = "timeline-memory-splitter";
    this._timelineMemorySplitter.addEventListener("mousedown", this._startSplitterDragging.bind(this), false);
    this._timelineMemorySplitter.addStyleClass("hidden");
    this._memoryStatistics = new WebInspector.MemoryStatistics(this, this._model, this.splitView.preferredSidebarWidth());
    WebInspector.settings.memoryCounterGraphsHeight = WebInspector.settings.createSetting("memoryCounterGraphsHeight", 150);

    var itemsTreeElement = new WebInspector.SidebarSectionTreeElement(WebInspector.UIString("RECORDS"), {}, true);
    this.sidebarTree.appendChild(itemsTreeElement);

    this._sidebarListElement = document.createElement("div");
    this.sidebarElement.appendChild(this._sidebarListElement);

    this._containerContentElement = this.splitView.mainElement;
    this._containerContentElement.id = "resources-container-content";

    this._timelineGrid = new WebInspector.TimelineGrid();
    this._itemsGraphsElement = this._timelineGrid.itemsGraphsElement;
    this._itemsGraphsElement.id = "timeline-graphs";
    this._containerContentElement.appendChild(this._timelineGrid.element);
    this._timelineGrid.gridHeaderElement.id = "timeline-grid-header";
    this._memoryStatistics.setMainTimelineGrid(this._timelineGrid);
    this.element.appendChild(this._timelineGrid.gridHeaderElement);

    this._topGapElement = document.createElement("div");
    this._topGapElement.className = "timeline-gap";
    this._itemsGraphsElement.appendChild(this._topGapElement);

    this._graphRowsElement = document.createElement("div");
    this._itemsGraphsElement.appendChild(this._graphRowsElement);

    this._bottomGapElement = document.createElement("div");
    this._bottomGapElement.className = "timeline-gap";
    this._itemsGraphsElement.appendChild(this._bottomGapElement);

    this._expandElements = document.createElement("div");
    this._expandElements.id = "orphan-expand-elements";
    this._itemsGraphsElement.appendChild(this._expandElements);

    this._calculator = new WebInspector.TimelineCalculator(this._model);
    var shortRecordThresholdTitle = Number.secondsToString(WebInspector.TimelinePresentationModel.shortRecordThreshold);
    this._showShortRecordsTitleText = WebInspector.UIString("Show the records that are shorter than %s", shortRecordThresholdTitle);
    this._hideShortRecordsTitleText = WebInspector.UIString("Hide the records that are shorter than %s", shortRecordThresholdTitle);
    this._createStatusbarButtons();

    this._frameMode = false;
    this._boundariesAreValid = true;
    this._scrollTop = 0;

    this._popoverHelper = new WebInspector.PopoverHelper(this.element, this._getPopoverAnchor.bind(this), this._showPopover.bind(this));
    this.element.addEventListener("mousemove", this._mouseMove.bind(this), false);
    this.element.addEventListener("mouseout", this._mouseOut.bind(this), false);

    // Disable short events filter by default.
    this.toggleFilterButton.toggled = true;
    this._showShortEvents = this.toggleFilterButton.toggled;
    this._overviewPane.setShowShortEvents(this._showShortEvents);

    this._timeStampRecords = [];
    this._expandOffset = 15;

    this._createFileSelector();

    this._model.addEventListener(WebInspector.TimelineModel.Events.RecordAdded, this._onTimelineEventRecorded, this);
    this._model.addEventListener(WebInspector.TimelineModel.Events.RecordsCleared, this._onRecordsCleared, this);

    this._registerShortcuts();

    this._allRecordsCount = 0;

    this._presentationModel.addFilter(this._overviewPane);
    this._presentationModel.addFilter(new WebInspector.TimelineCategoryFilter()); 
    this._presentationModel.addFilter(new WebInspector.TimelineIsLongFilter(this)); 
}