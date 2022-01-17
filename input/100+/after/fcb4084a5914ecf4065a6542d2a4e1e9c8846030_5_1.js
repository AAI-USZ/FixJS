function(workspaceForTest)
{
    WebInspector.Panel.call(this, "scripts");
    this.registerRequiredCSS("scriptsPanel.css");

    WebInspector.settings.pauseOnExceptionStateString = WebInspector.settings.createSetting("pauseOnExceptionStateString", WebInspector.ScriptsPanel.PauseOnExceptionsState.DontPauseOnExceptions);
    WebInspector.settings.navigatorWasOnceHidden = WebInspector.settings.createSetting("navigatorWasOnceHidden", false);
    WebInspector.settings.debuggerSidebarHidden = WebInspector.settings.createSetting("debuggerSidebarHidden", false);

    this._workspace = workspaceForTest || WebInspector.workspace;

    function viewGetter()
    {
        return this.visibleView;
    }
    WebInspector.GoToLineDialog.install(this, viewGetter.bind(this));

    var helpSection = WebInspector.shortcutsScreen.section(WebInspector.UIString("Sources Panel"));
    this.debugToolbar = this._createDebugToolbar(helpSection);

    const initialDebugSidebarWidth = 225;
    const maximalDebugSidebarWidthPercent = 50;
    this.createSplitView(this.element, WebInspector.SplitView.SidebarPosition.Right, initialDebugSidebarWidth);
    this.splitView.element.id = "scripts-split-view";
    this.splitView.minimalSidebarWidth = Preferences.minScriptsSidebarWidth;
    this.splitView.minimalMainWidthPercent = 100 - maximalDebugSidebarWidthPercent;

    this.sidebarElement.appendChild(this.debugToolbar);

    this.debugSidebarResizeWidgetElement = document.createElement("div");
    this.debugSidebarResizeWidgetElement.id = "scripts-debug-sidebar-resizer-widget";
    this.splitView.installResizer(this.debugSidebarResizeWidgetElement);

    // Create scripts navigator
    const initialNavigatorWidth = 225;
    const minimalViewsContainerWidthPercent = 50;
    this.editorView = new WebInspector.SplitView(WebInspector.SplitView.SidebarPosition.Left, "scriptsPanelNavigatorSidebarWidth", initialNavigatorWidth);
    this.editorView.element.tabIndex = 0;

    this.editorView.minimalSidebarWidth = Preferences.minScriptsSidebarWidth;
    this.editorView.minimalMainWidthPercent = minimalViewsContainerWidthPercent;
    this.editorView.show(this.splitView.mainElement);

    this._navigator = new WebInspector.ScriptsNavigator();
    this._navigator.view.show(this.editorView.sidebarElement);

    this._editorContainer = new WebInspector.TabbedEditorContainer(this, "previouslyViewedFiles");
    this._editorContainer.show(this.editorView.mainElement);

    this._navigatorController = new WebInspector.NavigatorOverlayController(this, this.editorView, this._navigator.view, this._editorContainer.view);

    this._navigator.addEventListener(WebInspector.ScriptsNavigator.Events.ScriptSelected, this._scriptSelected, this);
    this._navigator.addEventListener(WebInspector.ScriptsNavigator.Events.SnippetCreationRequested, this._snippetCreationRequested, this);
    this._navigator.addEventListener(WebInspector.ScriptsNavigator.Events.FileRenamed, this._fileRenamed, this);

    this._editorContainer.addEventListener(WebInspector.TabbedEditorContainer.Events.EditorSelected, this._editorSelected, this);
    this._editorContainer.addEventListener(WebInspector.TabbedEditorContainer.Events.EditorClosed, this._editorClosed, this);

    this.splitView.mainElement.appendChild(this.debugSidebarResizeWidgetElement);

    this.sidebarPanes = {};
    this.sidebarPanes.watchExpressions = new WebInspector.WatchExpressionsSidebarPane();
    this.sidebarPanes.callstack = new WebInspector.CallStackSidebarPane();
    this.sidebarPanes.scopechain = new WebInspector.ScopeChainSidebarPane();
    this.sidebarPanes.jsBreakpoints = new WebInspector.JavaScriptBreakpointsSidebarPane(WebInspector.breakpointManager, this._showSourceLine.bind(this));
    this.sidebarPanes.domBreakpoints = WebInspector.domBreakpointsSidebarPane;
    this.sidebarPanes.xhrBreakpoints = new WebInspector.XHRBreakpointsSidebarPane();
    this.sidebarPanes.eventListenerBreakpoints = new WebInspector.EventListenerBreakpointsSidebarPane();

    if (Preferences.exposeWorkersInspection && !WebInspector.WorkerManager.isWorkerFrontend()) {
        WorkerAgent.setWorkerInspectionEnabled(true);
        this.sidebarPanes.workerList = new WebInspector.WorkerListSidebarPane(WebInspector.workerManager);
    } else
        this.sidebarPanes.workers = new WebInspector.WorkersSidebarPane();

    this._debugSidebarContentsElement = document.createElement("div");
    this._debugSidebarContentsElement.id = "scripts-debug-sidebar-contents";
    this.sidebarElement.appendChild(this._debugSidebarContentsElement);

    for (var pane in this.sidebarPanes)
        this._debugSidebarContentsElement.appendChild(this.sidebarPanes[pane].element);

    this.sidebarPanes.callstack.expanded = true;

    this.sidebarPanes.scopechain.expanded = true;
    this.sidebarPanes.jsBreakpoints.expanded = true;

    this.sidebarPanes.callstack.registerShortcuts(helpSection, this.registerShortcut.bind(this));
    var evaluateInConsoleShortcut = WebInspector.KeyboardShortcut.makeDescriptor("e", WebInspector.KeyboardShortcut.Modifiers.Shift | WebInspector.KeyboardShortcut.Modifiers.Ctrl);
    helpSection.addKey(evaluateInConsoleShortcut.name, WebInspector.UIString("Evaluate selection in console"));
    this.registerShortcut(evaluateInConsoleShortcut.key, this._evaluateSelectionInConsole.bind(this));

    var outlineShortcut = WebInspector.KeyboardShortcut.makeDescriptor("o", WebInspector.KeyboardShortcut.Modifiers.CtrlOrMeta | WebInspector.KeyboardShortcut.Modifiers.Shift);
    helpSection.addKey(outlineShortcut.name, WebInspector.UIString("Go to member"));
    this.registerShortcut(outlineShortcut.key, this._showOutlineDialog.bind(this));

    var createBreakpointShortcut = WebInspector.KeyboardShortcut.makeDescriptor("b", WebInspector.KeyboardShortcut.Modifiers.CtrlOrMeta);
    helpSection.addKey(createBreakpointShortcut.name, WebInspector.UIString("Toggle breakpoint"));
    this.registerShortcut(createBreakpointShortcut.key, this._toggleBreakpoint.bind(this));

    var panelEnablerHeading = WebInspector.UIString("You need to enable debugging before you can use the Scripts panel.");
    var panelEnablerDisclaimer = WebInspector.UIString("Enabling debugging will make scripts run slower.");
    var panelEnablerButton = WebInspector.UIString("Enable Debugging");

    this.panelEnablerView = new WebInspector.PanelEnablerView("scripts", panelEnablerHeading, panelEnablerDisclaimer, panelEnablerButton);
    this.panelEnablerView.addEventListener("enable clicked", this.enableDebugging, this);

    this.enableToggleButton = new WebInspector.StatusBarButton("", "enable-toggle-status-bar-item");
    this.enableToggleButton.addEventListener("click", this.toggleDebugging, this);
    if (!Capabilities.debuggerCausesRecompilation)
        this.enableToggleButton.element.addStyleClass("hidden");

    this._pauseOnExceptionButton = new WebInspector.StatusBarButton("", "scripts-pause-on-exceptions-status-bar-item", 3);
    this._pauseOnExceptionButton.addEventListener("click", this._togglePauseOnExceptions, this);

    this._toggleFormatSourceButton = new WebInspector.StatusBarButton(WebInspector.UIString("Pretty print"), "scripts-toggle-pretty-print-status-bar-item");
    this._toggleFormatSourceButton.toggled = false;
    this._toggleFormatSourceButton.addEventListener("click", this._toggleFormatSource, this);

    this._scriptViewStatusBarItemsContainer = document.createElement("div");
    this._scriptViewStatusBarItemsContainer.style.display = "inline-block";

    this._debuggerEnabled = !Capabilities.debuggerCausesRecompilation;
    this._installDebuggerSidebarController();

    this._sourceFramesByUISourceCode = new Map();
    this._reset(false);

    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.DebuggerWasEnabled, this._debuggerWasEnabled, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.DebuggerWasDisabled, this._debuggerWasDisabled, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.DebuggerPaused, this._debuggerPaused, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.DebuggerResumed, this._debuggerResumed, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.CallFrameSelected, this._callFrameSelected, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.ConsoleCommandEvaluatedInSelectedCallFrame, this._consoleCommandEvaluatedInSelectedCallFrame, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.ExecutionLineChanged, this._executionLineChanged, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.BreakpointsActiveStateChanged, this._breakpointsActiveStateChanged, this);

    this._workspace.addEventListener(WebInspector.UISourceCodeProvider.Events.UISourceCodeAdded, this._handleUISourceCodeAdded, this);
    this._workspace.addEventListener(WebInspector.UISourceCodeProvider.Events.UISourceCodeReplaced, this._uiSourceCodeReplaced, this);
    this._workspace.addEventListener(WebInspector.UISourceCodeProvider.Events.UISourceCodeRemoved, this._uiSourceCodeRemoved, this);
    this._workspace.addEventListener(WebInspector.Workspace.Events.WorkspaceReset, this._reset.bind(this, false), this);

    var enableDebugger = !Capabilities.debuggerCausesRecompilation || WebInspector.settings.debuggerEnabled.get();
    if (enableDebugger)
        WebInspector.debuggerModel.enableDebugger();

    WebInspector.advancedSearchController.registerSearchScope(new WebInspector.ScriptsSearchScope(this._workspace));
    WebInspector.ContextMenu.registerProvider(this);
}