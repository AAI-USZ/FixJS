function(win)  // chrome is created in caller window.
{
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Private

    var panelSplitter, sidePanelDeck, panelBar1, panelBar2;

    var disabledHead = null;
    var disabledCaption = null;
    var enableSiteLink = null;
    var enableSystemPagesLink = null;
    var enableAlwaysLink = null;

var FirebugChrome =
{
    // TODO: remove this property, add getters for location, title, focusedElement, setter popup

    dispatchName: "FirebugChrome",

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Initialization

    /**
     * Called by panelBarWaiter when XUL panelBar(s) (main and side) are constructed
     * (i.e. the constructor of panelBar binding is executed twice) and when all Firebug
     * modules + extension modules (if any) are loaded.
     */
    initialize: function()
    {

        if (FBTrace.DBG_INITIALIZE)
            FBTrace.sysout("chrome.initialize;");

        this.window = win;

        panelSplitter = this.getElementById("fbPanelSplitter");
        sidePanelDeck = this.getElementById("fbSidePanelDeck");
        panelBar1 = this.getElementById("fbPanelBar1");
        panelBar2 = this.getElementById("fbPanelBar2");

        // Firebug has not been initialized yet
        if (!Firebug.isInitialized)
            Firebug.initialize(this);

        // FBL should be available at this moment.
        if (FBTrace.sysout && (!FBL || !FBL.initialize))
        {
            FBTrace.sysout("Firebug is broken, FBL incomplete, if the last function is QI, " +
                "check lib.js:", FBL);
        }

        var browser1Complete = false;
        var browser2Complete = false;

        if (panelBar1)
        {
            var browser1 = panelBar1.browser;
            browser1Complete = browser1.complete;

            if (!browser1Complete)
                Events.addEventListener(browser1, "load", browser1Loaded, true);

            browser1.droppedLinkHandler = function()
            {
                return false;
            };

            if (FBTrace.DBG_INITIALIZE)
                FBTrace.sysout("chrome.browser1.complete; " + browser1Complete);
        }

        if (panelBar2)
        {
            var browser2 = panelBar2.browser;
            browser2Complete = browser2.complete;

            if (!browser2Complete)
                Events.addEventListener(browser2, "load", browser2Loaded, true);

            browser2.droppedLinkHandler = function()
            {
                return false;
            };

            if (FBTrace.DBG_INITIALIZE)
                FBTrace.sysout("chrome.browser2.complete; " + browser2Complete);
        }

        Events.addEventListener(win, "blur", onBlur, true);

        if (FBTrace.DBG_INITIALIZE)
            FBTrace.sysout("chrome.initialized in " + win.location + " with " +
                (panelBar1 ? panelBar1.browser.ownerDocument.documentURI : "no panel bar"), win);

        // At this point both panelBars can be loaded already, since the src is specified
        // in firebugOveralay.xul (asynchronously loaded). If yes, start up
        // the initialization sequence now.
        if (browser1Complete && browser2Complete)
        {
            setTimeout(function()
            {
                FirebugChrome.initializeUI();  // the chrome bound into this scope
            })
        }
    },

    /**
     * Called when the UI is ready to be initialized, once the panel browsers are loaded.
     */
    initializeUI: function()
    {
        if (FBTrace.DBG_INITIALIZE)
            FBTrace.sysout("chrome.initializeUI;");

        // we listen for panel update
        Firebug.registerUIListener(this);

        try
        {
            var cmdPopupBrowser = this.getElementById("fbCommandPopupBrowser");

            this.applyTextSize(Firebug.textSize);

            var doc1 = panelBar1.browser.contentDocument;
            Events.addEventListener(doc1, "mouseover", onPanelMouseOver, false);
            Events.addEventListener(doc1, "mouseout", onPanelMouseOut, false);
            Events.addEventListener(doc1, "mousedown", onPanelMouseDown, false);
            Events.addEventListener(doc1, "mouseup", onPanelMouseUp, false);
            Events.addEventListener(doc1, "click", onPanelClick, false);
            Events.addEventListener(panelBar1, "selectingPanel", onSelectingPanel, false);
            Events.addEventListener(panelBar1, "DOMMouseScroll", onMouseScroll, false);

            var doc2 = panelBar2.browser.contentDocument;
            Events.addEventListener(doc2, "mouseover", onPanelMouseOver, false);
            Events.addEventListener(doc2, "mouseout", onPanelMouseOut, false);
            Events.addEventListener(doc2, "click", onPanelClick, false);
            Events.addEventListener(doc2, "mousedown", onPanelMouseDown, false);
            Events.addEventListener(doc2, "mouseup", onPanelMouseUp, false);
            Events.addEventListener(panelBar2, "selectPanel", onSelectedSidePanel, false);

            var doc3 = cmdPopupBrowser.contentDocument;
            Events.addEventListener(doc3, "mouseover", onPanelMouseOver, false);
            Events.addEventListener(doc3,"mouseout", onPanelMouseOut, false);
            Events.addEventListener(doc3, "mousedown", onPanelMouseDown, false);
            Events.addEventListener(doc3, "click", onPanelClick, false);

            var mainTabBox = panelBar1.ownerDocument.getElementById("fbPanelBar1-tabBox");
            Events.addEventListener(mainTabBox, "mousedown", onMainTabBoxMouseDown, false);

            // The side panel bar doesn't care about this event.  It must, however,
            // prevent it from bubbling now that we allow the side panel bar to be
            // *inside* the main panel bar.
            Events.addEventListener(panelBar2, "selectingPanel", stopBubble, false);

            var locationList = this.getElementById("fbLocationList");
            Events.addEventListener(locationList, "selectObject", onSelectLocation, false);

            this.updatePanelBar1(Firebug.panelTypes);

            // Internationalize Firebug UI before firing initializeUI
            // (so putting version into Firebug About menu operates with correct label)
            Firebug.internationalizeUI(win.document);
            Firebug.internationalizeUI(top.document);

            // xxxHonza: Is there any reason why we don't distribute "initializeUI"
            // event to modules?
            Firebug.initializeUI();

            // Append all registered stylesheets into Firebug UI.
            for (var i=0; i<Firebug.stylesheets.length; i++)
            {
                var uri = Firebug.stylesheets[i];
                this.appendStylesheet(uri);
            }

            if (FBTrace.DBG_INITIALIZE)
                FBTrace.sysout("chrome.initializeUI; Custom stylesheet appended " +
                    Firebug.stylesheets.length, Firebug.stylesheets);

            // Fire event for window event listeners.
            Firebug.sendLoadEvent();
        }
        catch (exc)
        {
            fatalError("chrome.initializeUI ERROR "+exc, exc);
        }
    },

    shutdown: function()
    {
        var doc1 = panelBar1.browser.contentDocument;
        Events.removeEventListener(doc1, "mouseover", onPanelMouseOver, false);
        Events.removeEventListener(doc1, "mouseout", onPanelMouseOut, false);
        Events.removeEventListener(doc1, "mousedown", onPanelMouseDown, false);
        Events.removeEventListener(doc1, "mouseup", onPanelMouseUp, false);
        Events.removeEventListener(doc1, "click", onPanelClick, false);
        Events.removeEventListener(panelBar1, "selectingPanel", onSelectingPanel, false);
        Events.removeEventListener(panelBar1, "DOMMouseScroll", onMouseScroll, false);

        var doc2 = panelBar2.browser.contentDocument;
        Events.removeEventListener(doc2, "mouseover", onPanelMouseOver, false);
        Events.removeEventListener(doc2, "mouseout", onPanelMouseOut, false);
        Events.removeEventListener(doc2, "mousedown", onPanelMouseDown, false);
        Events.removeEventListener(doc2, "mouseup", onPanelMouseUp, false);
        Events.removeEventListener(doc2, "click", onPanelClick, false);
        Events.removeEventListener(panelBar2, "selectPanel", onSelectedSidePanel, false);
        Events.removeEventListener(panelBar2, "selectingPanel", stopBubble, false);

        var cmdPopupBrowser = this.getElementById("fbCommandPopupBrowser");
        var doc3 = cmdPopupBrowser.contentDocument;
        Events.removeEventListener(doc3, "mouseover", onPanelMouseOver, false);
        Events.removeEventListener(doc3, "mouseout", onPanelMouseOut, false);
        Events.removeEventListener(doc3, "mousedown", onPanelMouseDown, false);
        Events.removeEventListener(doc3, "click", onPanelClick, false);

        var mainTabBox = panelBar1.ownerDocument.getElementById("fbPanelBar1-tabBox");
        Events.removeEventListener(mainTabBox, "mousedown", onMainTabBoxMouseDown, false);

        var locationList = this.getElementById("fbLocationList");
        Events.removeEventListener(locationList, "selectObject", onSelectLocation, false);

        Events.removeEventListener(win, "blur", onBlur, true);

        Firebug.unregisterUIListener(this);

        Firebug.shutdown();

        if (FBTrace.DBG_EVENTLISTENERS)
        {
            var info = [];
            var listeners = Firebug.Events.getRegisteredListeners();
            for (var i=0; i<listeners.length; i++)
            {
                var listener = listeners[i];
                info.push({
                    parentId: listener.parentId,
                    evendId: listener.eventId,
                    capturing: listener.capturing,
                    stack: listener.stack,
                });
            }

            FBTrace.sysout("firebug.shutdownFirebug; listeners: " + info.length, info);
        }

        if (FBTrace.DBG_INITIALIZE)
            FBTrace.sysout("chrome.shutdown; Done for " + win.location);
    },

    /**
     * Checking first window in back order, (Most recent window). is itself firebug ?
     */
    hasFocus: function()
    {
        try
        {
            return (wm.getMostRecentWindow(null).location.href.indexOf("firebug.xul") > 0);
        }
        catch(ex)
        {
            return false;
        }
    },

    appendStylesheet: function(uri)
    {
        var cmdPopupBrowser = this.getElementById("fbCommandPopupBrowser");

        var doc1 = panelBar1.browser.contentDocument;
        var doc2 = panelBar2.browser.contentDocument;
        var doc3 = cmdPopupBrowser.contentDocument;

        Css.appendStylesheet(doc1, uri);
        Css.appendStylesheet(doc2, uri);
        Css.appendStylesheet(doc3, uri);

        if (FBTrace.DBG_INITIALIZE)
            FBTrace.sysout("chrome.appendStylesheet; " + uri);
    },

    updateOption: function(name, value)
    {
        if (panelBar1 && panelBar1.selectedPanel)
            panelBar1.selectedPanel.updateOption(name, value);

        if (panelBar2 && panelBar2.selectedPanel)
            panelBar2.selectedPanel.updateOption(name, value);

        if (name == "textSize")
            this.applyTextSize(value);

        if (name == "omitObjectPathStack")
            this.obeyOmitObjectPathStack(value);

        if (name == "viewPanelOrient")
            this.updateOrient(value);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    disableOff: function(collapse)
    {
        // disable/enable this button in the Firebug.chrome window.
        Dom.collapse(FirebugChrome.$("fbCloseButton"), collapse);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    getPanelDocument: function(panelType)
    {
        var cmdPopup = this.getElementById("fbCommandPopup");
        var cmdPopupBrowser = this.getElementById("fbCommandPopupBrowser");

        // Command Line Popup can be displayed for all the other panels
        // (except for the Console panel)
        // XXXjjb, xxxHonza: this should be somehow better, more generic and extensible...
        var consolePanelType = Firebug.getPanelType("console");
        if (consolePanelType == panelType)
        {
            if (!Dom.isCollapsed(cmdPopup))
                return cmdPopupBrowser.contentDocument;
        }

        // Standard panel and side panel documents.
        if (!panelType.prototype.parentPanel)
            return panelBar1.browser.contentDocument;
        else
            return panelBar2.browser.contentDocument;
    },

    getPanelBrowser: function(panel)
    {
        if (!panel.parentPanel)
            return panelBar1.browser;
        else
            return panelBar2.browser;
    },

    savePanels: function()
    {
        var path = this.writePanels(panelBar1.browser.contentDocument);
        if (FBTrace.DBG_PANELS)
            FBTrace.sysout("Wrote panels to "+path+"\n");
    },

    writePanels: function(doc)
    {
        var serializer = new XMLSerializer();
        var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
               .createInstance(Components.interfaces.nsIFileOutputStream);
        var file = Components.classes["@mozilla.org/file/directory_service;1"]
           .getService(Components.interfaces.nsIProperties)
           .get("TmpD", Components.interfaces.nsIFile);

        file.append("firebug");   // extensions sub-directory
        file.append("panelSave.html");
        file.createUnique(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 0666);
        foStream.init(file, 0x02 | 0x08 | 0x20, 0664, 0);   // write, create, truncate
        serializer.serializeToStream(doc, foStream, "");   // rememeber, doc is the DOM tree
        foStream.close();
        return file.path;
    },

    updatePanelBar1: function(panelTypes)  // part of initializeUI
    {
        var mainPanelTypes = [];
        for (var i = 0; i < panelTypes.length; ++i)
        {
            var panelType = panelTypes[i];
            if (!panelType.prototype.parentPanel && !panelType.hidden)
                mainPanelTypes.push(panelType);
        }
        panelBar1.updatePanels(mainPanelTypes);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    getName: function()
    {
        return win ? win.location.href : null;
    },

    close: function()
    {
        if (FBTrace.DBG_INITIALIZE)
            FBTrace.sysout("chrome.close closing window "+win.location);
        win.close();
    },

    focus: function()
    {
        win.focus();
        panelBar1.browser.contentWindow.focus();
    },

    isFocused: function()
    {
        return wm.getMostRecentWindow(null) == win;
    },

    focusWatch: function(context)
    {
        if (Firebug.isDetached())
            Firebug.chrome.focus();
        else
            Firebug.toggleBar(true);

        Firebug.chrome.selectPanel("script");

        var watchPanel = context.getPanel("watches", true);
        if (watchPanel)
        {
            Firebug.CommandLine.isReadyElsePreparing(context);
            watchPanel.editNewWatch();
        }
    },

    isOpen: function()
    {
        return !(FirebugChrome.$("fbContentBox").collapsed);
    },

    toggleOpen: function(shouldShow)
    {
        var contentBox = Firebug.chrome.$("fbContentBox");
        contentBox.setAttribute("collapsed", !shouldShow);

        if (!this.inDetachedScope)
        {
            Dom.collapse(Firefox.getElementById('fbMainFrame'), !shouldShow);

            var contentSplitter = Firefox.getElementById('fbContentSplitter');
            if (contentSplitter)
                contentSplitter.setAttribute("collapsed", !shouldShow);
        }

        if (shouldShow && !this.positionInitialzed)
        {
            this.positionInitialzed = true;
            if (Firebug.framePosition != "detached" && Firebug.framePosition != "bottom")
                this.setPosition(); // null only updates frame position without side effects
        }
    },

    onDetach: function()
    {
        if(!Firebug.currentContext)
            Firebug.toggleBar(true);
        else
            Firebug.showBar(true);
    },

    onUndetach: function()
    {
        Dom.collapse(Firebug.chrome.$('fbResumeBox'), true);
        Dom.collapse(Firebug.chrome.$("fbContentBox"), false);
    },

    syncResumeBox: function(context)  // only called when detached
    {
        var resumeBox = Firebug.chrome.$('fbResumeBox');

        // xxxHonza: Don't focus Firebug window now. It would bring Firebug detached window
        // to the top every time the attached Firefox page is refreshed, which is annoying.
        //this.focus();  // bring to users attention

        if (context)
        {
            Firebug.chrome.toggleOpen(true);
            Firebug.chrome.syncPanel();
            Dom.collapse(resumeBox, true);
        }
        else
        {
            Firebug.chrome.toggleOpen(false);
            Dom.collapse(resumeBox, false);
            Firebug.chrome.window.top.document.title =
                Locale.$STR("Firebug - inactive for current website");
        }
    },

    reload: function(skipCache)
    {
        var reloadFlags = skipCache
            ? LOAD_FLAGS_BYPASS_PROXY | LOAD_FLAGS_BYPASS_CACHE
            : LOAD_FLAGS_NONE;

        // Make sure the selected tab in the attached browser window is refreshed.
        var browser = Firefox.getCurrentBrowser();
        browser.firebugReload = true;
        browser.webNavigation.reload(reloadFlags);

        if (FBTrace.DBG_WINDOWS)
            FBTrace.sysout("chrome.reload; " + skipCache + ", " + browser.currentURI.spec);
    },

    gotoPreviousTab: function()
    {
        if (Firebug.currentContext.previousPanelName)
            this.selectPanel(Firebug.currentContext.previousPanelName);
    },

    gotoSiblingTab : function(goRight)
    {
        if (FirebugChrome.$("fbContentBox").collapsed)
            return;
        var i, currentIndex = newIndex = -1, currentPanel = this.getSelectedPanel(), newPanel;
        var panelTypes = Firebug.getMainPanelTypes(Firebug.currentContext);

        // Get current panel's index (is there a simpler way for this?
        for (i = 0; i < panelTypes.length; i++)
        {
            if (panelTypes[i].prototype.name === currentPanel.name)
            {
                currentIndex = i;
                break;
            }
        }

        if (currentIndex != -1)
        {
            newIndex = goRight ? (currentIndex == panelTypes.length - 1 ?
                0 : ++currentIndex) : (currentIndex == 0 ? panelTypes.length - 1 : --currentIndex);

            newPanel = panelTypes[newIndex].prototype;
            if (newPanel && newPanel.name)
            {
                this.selectPanel(newPanel.name);
            }
        }
    },

    getNextObject: function(reverse)
    {
        var panel = Firebug.currentContext.getPanel(Firebug.currentContext.panelName);
        if (panel)
        {
            var panelStatus = this.getElementById("fbPanelStatus");
            var item = panelStatus.getItemByObject(panel.selection);
            if (item)
            {
                if (reverse)
                    item = item.previousSibling ? item.previousSibling.previousSibling : null;
                else
                    item = item.nextSibling ? item.nextSibling.nextSibling : null;

                if (item)
                    return item.repObject;
            }
        }
    },

    gotoNextObject: function(reverse)
    {
        var nextObject = this.getNextObject(reverse);
        if (nextObject)
            this.select(nextObject);
        else
            System.beep();
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Panels

    /**
     * Set this.location on the current panel or one given by name.
     * The location object should be known to the caller to be of the correct type for the panel,
     * eg SourceFile for Script panel
     * @param object the location object, null selects default location
     * @param panelName the .name field for the desired panel, null means current panel
     * @param sidePanelName I don't know how this affects the outcome
     */
    navigate: function(object, panelName, sidePanelName)
    {
        var panel;
        if (panelName || sidePanelName)
            panel = this.selectPanel(panelName, sidePanelName);
        else
            panel = this.getSelectedPanel();

        if (panel)
            panel.navigate(object);
    },

    /**
     *  Set this.selection by object type analysis, passing the object to all panels to
     *      find the best match
     *  @param object the new this.selection object
     *  @param panelName matching panel.name will be used, if its supportsObject returns true value
     *  @param sidePanelName default side panel name used, if its supportsObject returns true value
     *  @param forceUpdate if true, then (object === this.selection) is ignored and
     *      updateSelection is called
     */
    select: function(object, panelName, sidePanelName, forceUpdate)
    {
        if (FBTrace.DBG_PANELS)
            FBTrace.sysout("chrome.select object:"+object+" panelName:"+panelName+
                " sidePanelName:"+sidePanelName+" forceUpdate:"+forceUpdate+"\n");

        var bestPanelName = getBestPanelName(object, Firebug.currentContext, panelName);

        // Allow refresh if needed (the last argument).
        var panel = this.selectPanel(bestPanelName, sidePanelName/*, true*/);
        if (panel)
            panel.select(object, forceUpdate);

        // issue 4778
        this.syncLocationList();
    },

    selectPanel: function(panelName, sidePanelName, noRefresh)
    {
        if (panelName && sidePanelName)
            Firebug.currentContext.sidePanelNames[panelName] = sidePanelName;

        // cause panel visibility changes and events
        return panelBar1.selectPanel(panelName, false, noRefresh);
    },

    selectSidePanel: function(panelName)
    {
        return panelBar2.selectPanel(panelName);
    },

    selectSupportingPanel: function(object, context, forceUpdate)
    {
        var bestPanelName = getBestPanelSupportingObject(object, context);
        var panel = this.selectPanel(bestPanelName, false, true);
        if (panel)
            panel.select(object, forceUpdate);
    },

    clearPanels: function()
    {
        panelBar1.hideSelectedPanel();
        panelBar1.selectedPanel = null;
        panelBar2.selectedPanel = null;
    },

    getSelectedPanel: function()
    {
        return panelBar1 ? panelBar1.selectedPanel : null;
    },

    getSelectedSidePanel: function()
    {
        return panelBar2 ? panelBar2.selectedPanel : null;
    },

    switchToPanel: function(context, switchToPanelName)
    {
        // Remember the previous panel and bar state so we can revert if the user cancels
        this.previousPanelName = context.panelName;
        this.previousSidePanelName = context.sidePanelName;
        this.previouslyCollapsed = FirebugChrome.$("fbContentBox").collapsed;

        // TODO previouslyMinimized
        this.previouslyFocused = Firebug.isDetached() && this.isFocused();

        var switchPanel = this.selectPanel(switchToPanelName);
        if (switchPanel)
            this.previousObject = switchPanel.selection;

        return switchPanel;
    },

    unswitchToPanel: function(context, switchToPanelName, canceled)
    {
        var switchToPanel = context.getPanel(switchToPanelName);

        if (this.previouslyFocused)
            this.focus();

        if (canceled && this.previousPanelName)
        {
            // revert
            if (this.previouslyCollapsed)
                Firebug.showBar(false);

            if (this.previousPanelName == switchToPanelName)
                switchToPanel.select(this.previousObject);
            else
                this.selectPanel(this.previousPanelName, this.previousSidePanelName);
        }
        else
        {
            // else stay on the switchToPanel
            this.selectPanel(switchToPanelName);
            if (switchToPanel.selection)
                this.select(switchToPanel.selection);
            this.getSelectedPanel().panelNode.focus();
        }

        delete this.previousObject;
        delete this.previousPanelName;
        delete this.previousSidePanelName;
        delete this.inspectingChrome;

        return switchToPanel;
    },

    getSelectedPanelURL: function()
    {
        var location;
        if (Firebug.currentContext)
        {
            var panel = Firebug.chrome.getSelectedPanel();
            if (panel)
            {
                location = panel.location;
                if (!location && panel.name == "html")
                    location = Firebug.currentContext.window.document.location;

                if (location && (location instanceof Firebug.SourceFile ||
                    location instanceof CSSStyleSheet))
                    location = location.href;
            }
        }

        if (!location)
        {
            var currentURI = Firefox.getCurrentURI();
            if (currentURI)
                location = currentURI.asciiSpec;
        }

        if (!location)
            return;

        location = location.href || location.url || location.toString();
        if (Firebug.filterSystemURLs && Url.isSystemURL(location))
            return;

        return location;
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Location interface provider for binding.xml panelFileList

    getLocationProvider: function()
    {
        // a function that returns an object with .getObjectDescription() and .getLocationList()
        return function getSelectedPanelFromCurrentContext()
        {
            // panels provide location, use the selected panel
            return Firebug.chrome.getSelectedPanel();
        }
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // UI Synchronization

    setFirebugContext: function(context)
    {
         // This sets the global value of Firebug.currentContext in the window, that this
         // chrome is compiled into. Note, that for firebug.xul the Firebug object is shared
         // across windows, but not FirebugChrome and Firebug.currentContext.
         Firebug.currentContext = context;

         if (FBTrace.DBG_WINDOWS || FBTrace.DBG_DISPATCH || FBTrace.DBG_ACTIVATION)
             FBTrace.sysout("setFirebugContext "+(Firebug.currentContext?
                Firebug.currentContext.getName():" **> NULL <** ") + " in "+win.location);
    },

    hidePanel: function()
    {
        if (panelBar1.selectedPanel)
            panelBar1.hideSelectedPanel()

        if (panelBar2.selectedPanel)
            panelBar2.hideSelectedPanel()
    },

    syncPanel: function(panelName)
    {
        var context = Firebug.currentContext;

        if (FBTrace.DBG_PANELS)
            FBTrace.sysout("chrome.syncPanel Firebug.currentContext=" +
                (context ? context.getName() : "undefined"));

        var panelStatus = this.getElementById("fbPanelStatus");
        panelStatus.clear();

        if (context)
        {
            if (!panelName)
                panelName = context.panelName? context.panelName : Firebug.defaultPanelName;

            // Make HTML panel the default panel, which is displayed
            // to the user the very first time.
            if (!panelName || !Firebug.getPanelType(panelName))
                panelName = "html";

            this.syncMainPanels();
            panelBar1.selectPanel(panelName, true);
        }
        else
        {
            panelBar1.selectPanel(null, true);
        }

        if (Firebug.isDetached())
            this.syncTitle();
    },

    syncMainPanels: function()
    {
        if (Firebug.currentContext)
        {
            var panelTypes = Firebug.getMainPanelTypes(Firebug.currentContext);
            panelBar1.updatePanels(panelTypes);

            // Upadate also BON tab flag (orange background if BON is active)
            // every time the user changes the current tab in Firefox.
            Firebug.Breakpoint.updatePanelTabs(Firebug.currentContext);
        }
    },

    syncSidePanels: function()
    {
        if (FBTrace.DBG_PANELS)
        {
            FBTrace.sysout("chrome.syncSidePanels; main panel: " +
                (panelBar1.selectedPanel ? panelBar1.selectedPanel.name : "no panel") +
                ", side panel: " +
                (panelBar2.selectedPanel ? panelBar2.selectedPanel.name : "no panel"));
        }

        if (!panelBar1.selectedPanel)
            return;

        var panelTypes;
        if (Firebug.currentContext)
        {
            panelTypes = Firebug.getSidePanelTypes(Firebug.currentContext,
                panelBar1.selectedPanel);
            panelBar2.updatePanels(panelTypes);
        }

        if (Firebug.currentContext && Firebug.currentContext.sidePanelNames)
        {
            if (!panelBar2.selectedPanel ||
                (panelBar2.selectedPanel.parentPanel !== panelBar1.selectedPanel.name))
            {
                var sidePanelName = Firebug.currentContext.sidePanelNames[
                    Firebug.currentContext.panelName];
                sidePanelName = getBestSidePanelName(sidePanelName, panelTypes);
                panelBar2.selectPanel(sidePanelName, true);
            }
            else
            {
                // if the context changes we need to refresh the panel
                panelBar2.selectPanel(panelBar2.selectedPanel.name, true);
            }
        }
        else
        {
            panelBar2.selectPanel(null);
        }

        if (FBTrace.DBG_PANELS)
            FBTrace.sysout("chrome.syncSidePanels; selected side panel " + panelBar1.selectedPanel);

        sidePanelDeck.selectedPanel = panelBar2;

        Dom.collapse(sidePanelDeck, !panelBar2.selectedPanel);
        Dom.collapse(panelSplitter, !panelBar2.selectedPanel);
    },

    syncTitle: function()
    {
        if (Firebug.currentContext)
        {
            var title = Firebug.currentContext.getTitle();
            win.top.document.title = Locale.$STRF("WindowTitle", [title]);
        }
        else
        {
            win.top.document.title = Locale.$STR("Firebug");
        }
    },

    focusLocationList: function()
    {
        var locationList = this.getElementById("fbLocationList");
        locationList.popup.showPopup(locationList, -1, -1, "popup", "bottomleft", "topleft");
    },

    syncLocationList: function()
    {
        var locationButtons = this.getElementById("fbLocationButtons");

        var panel = panelBar1.selectedPanel;
        if (panel && panel.location)
        {
            var locationList = this.getElementById("fbLocationList");
            locationList.location = panel.location;

            Dom.collapse(locationButtons, false);
        }
        else
        {
            Dom.collapse(locationButtons, true);
        }
    },

    clearStatusPath: function()
    {
        var panelStatus = this.getElementById("fbPanelStatus");
        panelStatus.clear();
    },

    syncStatusPath: function()
    {
        var panelStatus = this.getElementById("fbPanelStatus");
        var panelStatusSeparator = this.getElementById("fbStatusSeparator");
        var panel = panelBar1.selectedPanel;

        if (!panel || (panel && !panel.selection))
        {
            panelStatus.clear();
        }
        else
        {
            var path = panel.getObjectPath(panel.selection);
            if (!path || !path.length)
            {
                Dom.hide(panelStatusSeparator, true);
                panelStatus.clear();
            }
            else
            {
                // Alright, let's update visibility of the separator. The separator
                // is displayed only, if there are some other buttons on the left side.
                // Before showing the status separator let's see whether there are any other
                // buttons on the left.
                var hide = true;
                var sibling = panelStatusSeparator.parentNode.previousSibling;
                while (sibling)
                {
                    if (!Dom.isCollapsed(sibling))
                    {
                        hide = false;
                        break;
                    }
                    sibling = sibling.previousSibling;
                }
                Dom.hide(panelStatusSeparator, hide);

                if (panel.name != panelStatus.lastPanelName)
                    panelStatus.clear();

                panelStatus.lastPanelName = panel.name;

                // If the object already exists in the list, just select it and keep the path
                var selection = panel.selection;
                var existingItem = panelStatus.getItemByObject(panel.selection);
                if (existingItem)
                {
                    // Update the labels of the status path elements, because it can be,
                    // that the elements changed even when the selected element exists
                    // inside the path (issue 4826)
                    var statusItems = panelStatus.getItems();
                    for (var i = 0; i < statusItems.length; ++i)
                    {
                        var object = Firebug.getRepObject(statusItems[i]);
                        var rep = Firebug.getRep(object, Firebug.currentContext);
                        var objectTitle = rep.getTitle(object, Firebug.currentContext);
                        var title = String.cropMultipleLines(objectTitle, statusCropSize);

                        statusItems[i].label = title;
                    }
                    panelStatus.selectItem(existingItem);
                }
                else
                {
                    panelStatus.clear();

                    for (var i = 0; i < path.length; ++i)
                    {
                        var object = path[i];

                        var rep = Firebug.getRep(object, Firebug.currentContext);
                        var objectTitle = rep.getTitle(object, Firebug.currentContext);

                        var title = String.cropMultipleLines(objectTitle, statusCropSize);
                        panelStatus.addItem(title, object, rep, panel.statusSeparator);
                    }

                    panelStatus.selectObject(panel.selection);
                    if (FBTrace.DBG_PANELS)
                        FBTrace.sysout("syncStatusPath "+path.length+" items ", path);
                }
            }
        }
    },

    toggleOrient: function(preferredValue)
    {
        var value = Options.get("viewPanelOrient");
        if (value == preferredValue)
            return;

        Options.togglePref("viewPanelOrient");
    },

    updateOrient: function(value)
    {
        var panelPane = FirebugChrome.$("fbPanelPane");
        if (!panelPane)
            return;

        var newOrient = value ? "vertical" : "horizontal";
        if (panelPane.orient == newOrient)
            return;

        panelSplitter.orient = panelPane.orient = newOrient;
    },

    setPosition: function(pos)
    {
        if (Firebug.framePosition == pos)
            return;

        if (pos)
        {
            if (Firebug.getSuspended())
                Firebug.toggleBar();
        }
        else
        {
            pos = Firebug.framePosition;
        }

        if (pos == "detached")
        {
            Firebug.toggleDetachBar(true, true);
            return;
        }

        if (Firebug.isDetached())
            Firebug.toggleDetachBar(false, true);

        pos && this.syncPositionPref(pos);

        var vertical = pos == "top" || pos == "bottom";
        var after = pos == "bottom" || pos == "right";

        var document = window.top.document;
        var container = document.getElementById(vertical ? "appcontent" : "browser");

        var splitter = Firefox.getElementById("fbContentSplitter");
        splitter.setAttribute("orient", vertical ? "vertical" : "horizontal");
        splitter.setAttribute("dir", after ? "" : "reverse");
        container.insertBefore(splitter, after ? null: container.firstChild);

        var frame = document.getElementById("fbMainFrame");

        var newFrame = frame.cloneNode(true);
        var newBrowser = newFrame.querySelector("#fbMainContainer");
        var oldBrowser = frame.querySelector("#fbMainContainer");

        newBrowser.removeAttribute("src");
        container.insertBefore(newFrame, after ? null: container.firstChild);

        this.swapBrowsers(oldBrowser, newBrowser);
        this.browser = newBrowser;

        frame.parentNode.removeChild(frame);
        this.framePosition = pos;
    },

    syncPositionPref: function(pos)
    {
        if (!pos)
        {
            if (Firebug.isDetached())
                pos = "detached";
            else
                pos = this.framePosition || 'bottom';
        }

        Firebug.Options.set("framePosition", pos);
        return Firebug.framePosition = pos;
    },

    swapBrowsers: function(oldBrowser, newBrowser)
    {
        var oldDoc = oldBrowser.contentDocument
        // Panels remember top window, for which they were first opened.
        // So we need to destroy their views.
        var styleSheet = oldDoc.styleSheets[0];
        var rulePos = styleSheet.cssRules.length;
        styleSheet.insertRule(
            "panel{display:-moz-box!important; visibility:collapse!important;}", rulePos);

        // We need to deal with inner frames first since swapFrameLoaders
        // doesn't work for type="chrome" browser containing type="content" browsers
        var frames = oldDoc.querySelectorAll("browser[type*=content], iframe[type*=content]");
        var tmpFrames = [], placeholders = [];

        var topDoc = oldBrowser.ownerDocument;
        var temp = topDoc.createElement("box");
        topDoc.documentElement.appendChild(temp);

        var swapDocShells = function(a, b)
        {
            // important! must touch browser.contentDocument to initialize it
            a.contentDocument == b.contentDocument;
            if (a.nodeName == "iframe")
                a.QueryInterface(Ci.nsIFrameLoaderOwner).swapFrameLoaders(b);
            else
                a.swapDocShells(b);
        }

        for (var i = frames.length - 1; i >= 0; i--)
        {
            placeholders[i] = document.createElement("placeholder");
            tmpFrames[i] = frames[i].cloneNode(true);
            tmpFrames[i].removeAttribute("src");
            frames[i].removeAttribute("src");
            temp.appendChild(tmpFrames[i]);
        }

        for (var i = tmpFrames.length - 1; i >= 0; i--)
        {
            swapDocShells(tmpFrames[i], frames[i]);
            frames[i].parentNode.replaceChild(placeholders[i], frames[i]);
        }

        swapDocShells(oldBrowser, newBrowser);

        for (var i = placeholders.length - 1; i >= 0; i--)
            placeholders[i].parentNode.replaceChild(frames[i], placeholders[i]);

        for (var i = frames.length - 1; i >= 0; i--)
            swapDocShells(tmpFrames[i], frames[i]);

        temp.parentNode.removeChild(temp);

        styleSheet.deleteRule(rulePos);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Global Attributes

    getGlobalAttribute: function(id, name)
    {
        var elt = FirebugChrome.$(id);
        return elt.getAttribute(name);
    },

    setGlobalAttribute: function(id, name, value)
    {
        var elt = FirebugChrome.$(id);
        if (elt)
        {
            if (value == null)
                elt.removeAttribute(name);
            else
                elt.setAttribute(name, value);
        }

        if (Firebug.externalChrome)
            Firebug.externalChrome.setGlobalAttribute(id, name, value);
    },

    setChromeDocumentAttribute: function(id, name, value)
    {
        // Call as Firebug.chrome.setChromeDocumentAttribute() to set attributes
        // in another window.
        var elt = FirebugChrome.$(id);
        if (elt)
            elt.setAttribute(name, value);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    keyCodeListen: function(key, filter, listener, capture)
    {
        if (!filter)
            filter = Events.noKeyModifiers;

        var keyCode = KeyEvent["DOM_VK_"+key];

        function fn(event)
        {
            if (event.keyCode == keyCode && (!filter || filter(event)))
            {
                listener();
                Events.cancelEvent(event);
            }
        }

        Events.addEventListener(win, "keypress", fn, capture);

        return [fn, capture];
    },

    keyListen: function(ch, filter, listener, capture)
    {
        if (!filter)
            filter = Events.noKeyModifiers;

        var charCode = ch.charCodeAt(0);

        function fn(event)
        {
            if (event.charCode == charCode && (!filter || filter(event)))
            {
                listener();
                Events.cancelEvent(event);
            }
        }

        Events.addEventListener(win, "keypress", fn, capture);

        return [fn, capture];
    },

    keyIgnore: function(listener)
    {
        Events.removeEventListener(win, "keypress", listener[0], listener[1]);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    $: function(id)
    {
        return this.getElementById(id);
    },

    getElementById: function(id)
    {
        // The document we close over not the global.
        return win.document.getElementById(id);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    applyTextSize: function(value)
    {
        if (!panelBar1)
            return;

        var zoom = Firebug.Options.getZoomByTextSize(value);
        var zoomString = (zoom * 100) + "%";

        var fontSizeAdjust = zoom * 0.547; // scale the aspect relative to 11pt Lucida Grande
        var contentBox = Firebug.chrome.$("fbContentBox");
        contentBox.style.fontSizeAdjust = fontSizeAdjust;

        //panelBar1.browser.contentDocument.documentElement.style.fontSizeAdjust = fontSizeAdjust;
        //panelBar2.browser.contentDocument.documentElement.style.fontSizeAdjust = fontSizeAdjust;

        panelBar1.browser.markupDocumentViewer.textZoom = zoom;
        panelBar2.browser.markupDocumentViewer.textZoom = zoom;

        var cmdPopupBrowser = this.getElementById("fbCommandPopupBrowser");
        cmdPopupBrowser.markupDocumentViewer.textZoom = zoom;

        var box = Firebug.chrome.$("fbCommandBox");
        box.style.fontSizeAdjust = fontSizeAdjust;
        if (Firebug.CommandLine)
        {
            Firebug.CommandLine.getSingleRowCommandLine().style.fontSizeAdjust = fontSizeAdjust;
            Firebug.chrome.$("fbCommandLineCompletion").style.fontSizeAdjust = fontSizeAdjust;
            Firebug.chrome.$("fbCommandLineCompletionList").style.fontSizeAdjust = fontSizeAdjust;

            Firebug.CommandEditor.fontSizeAdjust(fontSizeAdjust);
        }

        Firebug.dispatchToPanels("onTextSizeChange", [zoom, fontSizeAdjust]);
    },

    obeyOmitObjectPathStack: function(value)
    {
        var panelStatus = this.getElementById("fbPanelStatus");
        Dom.hide(panelStatus, (value?true:false));
    },

    getPanelStatusElements: function()
    {
        return this.getElementById("fbPanelStatus");
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // UI Event Listeners uilisteners  or "panelListeners"

    onPanelNavigate: function(object, panel)
    {
        this.syncLocationList();
    },

    onObjectSelected: function(object, panel)
    {
        if (panel == panelBar1.selectedPanel)
        {
            this.syncStatusPath();

            var sidePanel = panelBar2.selectedPanel;
            if (sidePanel)
                sidePanel.select(object);
        }
    },

    onObjectChanged: function(object, panel)
    {
        if (panel == panelBar1.selectedPanel)
        {
            this.syncStatusPath();

            var sidePanel = panelBar2.selectedPanel;
            if (sidePanel)
                sidePanel.select(object);
        }
    },

    // called on setTimeout after sourceBox viewport has been repainted
    onApplyDecorator: function(sourceBox)
    {
    },

    // called on scrollTo, passing in the selected line
    onViewportChange: function(sourceLink)
    {
    },

    // called when the Firebug UI comes up in browser
    showUI: function(browser, context)
    {
    },

    // called when the Firebug UI comes down; context may be null
    hideUI: function(browser, context)
    {
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    onMenuShowing: function(popup)
    {
        var detachFirebug = Dom.getElementsByAttribute(popup, "id", "menu_firebug_detachFirebug")[0];
        if (detachFirebug)
        {
            detachFirebug.setAttribute("label", (Firebug.isDetached() ?
                Locale.$STR("firebug.AttachFirebug") : Locale.$STR("firebug.DetachFirebug")));
        }

        var toggleFirebug = Dom.getElementsByAttribute(popup, "id", "menu_firebug_toggleFirebug")[0];
        if (toggleFirebug)
        {
            var fbContentBox = FirebugChrome.$("fbContentBox");
            var collapsed = fbContentBox.getAttribute("collapsed");
            if (collapsed == "true")
            {
                toggleFirebug.setAttribute("label", Locale.$STR("inBrowser"));
                toggleFirebug.setAttribute("tooltiptext", Locale.$STR("inBrowser"));
            }
            else
            {
              toggleFirebug.setAttribute("label", Locale.$STR("firebug.menu.Minimize_Firebug"));
              toggleFirebug.setAttribute("tooltiptext", Locale.$STR("firebug.menu.tip.Minimize_Firebug"));
            }

            // If Firebug is detached, hide the menu ('Open Firebug' shortcut doesn't hide,
            // but just focuses the external window)
            if (Firebug.isDetached())
                toggleFirebug.setAttribute("collapsed", (collapsed == "true" ? "false" : "true"));
        }
    },

    onOptionsShowing: function(popup)
    {
        for (var child = popup.firstChild; child; child = child.nextSibling)
        {
            if (child.localName == "menuitem")
            {
                var option = child.getAttribute("option");
                if (option)
                {
                    var checked = false;
                    if (option == "profiling")
                        checked = FBS.profiling;
                    else
                        checked = Firebug.Options.get(option);

                    child.setAttribute("checked", checked);
                }
            }
        }
    },

    onToggleOption: function(menuitem)
    {
        var option = menuitem.getAttribute("option");
        var checked = menuitem.getAttribute("checked") == "true";

        Firebug.Options.set(option, checked);
    },

    onContextShowing: function(event)
    {
        // xxxHonza: This context-menu support can be used even in a separate window, which
        // doesn't contain the Firebug UI (panels).
        //if (!panelBar1.selectedPanel)
        //    return false;

        var popup = event.target;
        if (popup.id != "fbContextMenu")
            return;

        var target = win.document.popupNode;
        var panel = target ? Firebug.getElementPanel(target) : null;

        // the event must be on our chrome not inside the panel
        if (!panel)
            panel = panelBar1 ? panelBar1.selectedPanel : null;

        Dom.eraseNode(popup);

        // Make sure the Copy action is only available if there is actually someting
        // selected in the panel.
        var sel = target.ownerDocument.defaultView.getSelection();
        if (!this.contextMenuObject &&
            !FirebugChrome.$("cmd_copy").getAttribute("disabled") &&
            !sel.isCollapsed)
        {
            var menuitem = Menu.createMenuItem(popup, {label: "Copy"});
            menuitem.setAttribute("command", "cmd_copy");
        }

        var object;
        if (this.contextMenuObject)
            object = this.contextMenuObject;
        else if (target && target.ownerDocument == document)
            object = Firebug.getRepObject(target);
        else if (target && panel)
            object = panel.getPopupObject(target);
        else if (target)
            // xxxHonza: What about a node from different document? Is that OK?
            object = Firebug.getRepObject(target);

        this.contextMenuObject = null;

        var rep = Firebug.getRep(object, Firebug.currentContext);
        var realObject = rep ? rep.getRealObject(object, Firebug.currentContext) : null;
        var realRep = realObject ? Firebug.getRep(realObject, Firebug.currentContext) : null;

        if (FBTrace.DBG_OPTIONS)
            FBTrace.sysout("chrome.onContextShowing object:"+object+" rep: "+rep+
                " realObject: "+realObject+" realRep:"+realRep);

        if (realObject && realRep)
        {
            // 1. Add the custom menu items from the realRep
            var menu = realRep.getContextMenuItems(realObject, target, Firebug.currentContext);
            if (menu)
            {
                for (var i = 0; i < menu.length; ++i)
                    Menu.createMenuItem(popup, menu[i]);
            }
        }

        if (object && rep && rep != realRep)
        {
            // 1. Add the custom menu items from the original rep
            var items = rep.getContextMenuItems(object, target, Firebug.currentContext);
            if (items)
            {
                for (var i = 0; i < items.length; ++i)
                    Menu.createMenuItem(popup, items[i]);
            }
        }

        // 1. Add the custom menu items from the panel
        if (panel)
        {
            var items = panel.getContextMenuItems(realObject, target);
            if (items)
            {
                for (var i = 0; i < items.length; ++i)
                    Menu.createMenuItem(popup, items[i]);
            }
        }

        // 2. Add the inspect menu items
        if (realObject && rep && rep.inspectable)
        {
            var separator = null;

            var items = this.getInspectMenuItems(realObject);
            for (var i = 0; i < items.length; ++i)
            {
                if (popup.firstChild && !separator)
                    separator = Menu.createMenuSeparator(popup);

                Menu.createMenuItem(popup, items[i]);
            }
        }

        // 3. Add menu items from uiListeners
        var items = [];
        Events.dispatch(Firebug.uiListeners, "onContextMenu", [items, object, target,
            Firebug.currentContext, panel, popup]);

        if (items)
        {
            for (var i = 0; i < items.length; ++i)
                Menu.createMenuItem(popup, items[i]);
        }

        if (!popup.firstChild)
            return false;
    },

    getInspectMenuItems: function(object)
    {
        var items = [];

        // Domplate (+ support for context menus) can be used even in separate
        // windows when Firebug.currentContext doesn't have to be defined.
        if (!Firebug.currentContext)
            return items;

        for (var i = 0; i < Firebug.panelTypes.length; ++i)
        {
            var panelType = Firebug.panelTypes[i];
            if (!panelType.prototype.parentPanel
                && panelType.prototype.name != Firebug.currentContext.panelName
                && panelSupportsObject(panelType, object, Firebug.currentContext))
            {
                var panelName = panelType.prototype.name;

                var title = Firebug.getPanelTitle(panelType);
                var label = Locale.$STRF("panel.Inspect_In_Panel", [title]);
                var tooltiptext = Locale.$STRF("panel.tip.Inspect_In_Panel", [title]);
                var id = "InspectIn" + panelName + "Panel";

                var command = Obj.bindFixed(this.select, this, object, panelName);
                items.push({label: label, tooltiptext: tooltiptext, command: command, nol10n: true,
                    id: id});
            }
        }

        return items;
    },

    onTooltipShowing: function(event)
    {
        // xxxHonza: This tooltip support can be used even in a separate window, which
        // doesn't contain the Firebug UI (panels).
        //if (!panelBar1.selectedPanel)
        //    return false;

        var tooltip = FirebugChrome.$("fbTooltip");
        var target = win.document.tooltipNode;

        var panel = target ? Firebug.getElementPanel(target) : null;

        var object;

        /* XXXjjb This causes the Script panel to show the function body over and over.
         * We need to clear it at least, but really we need to understand why the tooltip
         * should show the context menu object at all. One thing the contextMenuObject supports
         * is peeking at function bodies when stopped at a breakpoint.
         * That case could be supported with clearing the contextMenuObject, but we don't
         * know, if that breaks something else. So maybe a popupMenuObject should be set
         * on the context if that is what we want to support
         * The other complication is, that there seems to be another tooltip.
        if (this.contextMenuObject)
        {
            object = this.contextMenuObject;
            FBTrace.sysout("tooltip by contextMenuObject");
        }
        else*/

        if (target && target.ownerDocument == document)
            object = Firebug.getRepObject(target);
        else if (panel)
            object = panel.getTooltipObject(target);

        var rep = object ? Firebug.getRep(object, Firebug.currentContext) : null;
        object = rep ? rep.getRealObject(object, Firebug.currentContext) : null;
        rep = object ? Firebug.getRep(object) : null;

        if (object && rep)
        {
            var label = rep.getTooltip(object, Firebug.currentContext);
            if (label)
            {
                tooltip.setAttribute("label", label);
                return true;
            }
        }

        if (Css.hasClass(target, 'noteInToolTip'))
            Css.setClass(tooltip, 'noteInToolTip');
        else
            Css.removeClass(tooltip, 'noteInToolTip');

        if (target && target.hasAttribute("title"))
        {
            tooltip.setAttribute("label", target.getAttribute("title"));
            return true;
        }

        return false;
    },

    openAboutDialog: function()
    {
        if (FBTrace.DBG_WINDOWS)
            FBTrace.sysout("Firebug.openAboutDialog");

        try
        {
            // Firefox 4.0+ implements a new AddonManager. In case of Firefox 3.6 the module
            // is not available and there is an exception.
            Components.utils["import"]("resource://gre/modules/AddonManager.jsm");
        }
        catch (err)
        {
        }

        if (typeof(AddonManager) != "undefined")
        {
            AddonManager.getAddonByID("firebug@software.joehewitt.com", function(addon)
            {
                openDialog("chrome://mozapps/content/extensions/about.xul", "",
                "chrome,centerscreen,modal", addon);
            });
        }
        else
        {
            var extensionManager = Cc["@mozilla.org/extensions/manager;1"].getService(
                Ci.nsIExtensionManager);

            openDialog("chrome://mozapps/content/extensions/about.xul", "",
                "chrome,centerscreen,modal", "urn:mozilla:item:firebug@software.joehewitt.com",
                extensionManager.datasource);
        }
    },

    breakOnNext: function(context, event)
    {
        // Avoid bubbling from associated options.
        if (event.target.id != "cmd_firebug_toggleBreakOn")
            return;

        if (!context)
        {
            if (FBTrace.DBG_BP)
                FBTrace.sysout("Firebug chrome: breakOnNext with no context??");
            return;
        }

        var panel = panelBar1.selectedPanel;

        if (FBTrace.DBG_BP)
            FBTrace.sysout("Firebug chrome: breakOnNext for panel " +
                (panel ? panel.name : "NO panel"), panel);

        if (panel && panel.breakable)
            Firebug.Breakpoint.toggleBreakOnNext(panel);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Main Toolbar

    appendToolbarButton: function(button, before)
    {
        var toolbar = FirebugChrome.$("fbPanelBar1-buttons");
        var element = Toolbar.createToolbarButton(toolbar, button, before);
        element.repObject = button;
    },

    removeToolbarButton: function(button)
    {
        var toolbar = FirebugChrome.$("fbPanelBar1-buttons");
        for (var child = toolbar.firstChild; child; child = child.nextSibling)
        {
            if (child.repObject == button)
            {
                toolbar.removeChild(child);
                break;
            }
        }
    },

};  // end of FirebugChrome

// ********************************************************************************************* //
// Local Helpers

function panelSupportsObject(panelType, object, context)
{
    if (panelType)
    {
        try {
            // This tends to throw exceptions often, because some objects are weird
            return panelType.prototype.supportsObject(object, typeof object, context)
        } catch (exc) {}
    }

    return 0;
}

function getBestPanelName(object, context, panelName)
{
    if (!panelName && context)
        panelName = context.panelName;

    // Check if the panel type of the suggested panel supports the object, and if so, go with it
    if (panelName)
    {
        var panelType = Firebug.getPanelType(panelName);
        if (panelSupportsObject(panelType, object, context))
            return panelType.prototype.name;
    }

    // The suggested name didn't pan out, so search for the panel type with the
    // most specific level of support
    return getBestPanelSupportingObject(object, context);
}

function getBestPanelSupportingObject(object, context)
{
    var bestLevel = 0;
    var bestPanel = null;

    for (var i = 0; i < Firebug.panelTypes.length; ++i)
    {
        var panelType = Firebug.panelTypes[i];
        if (!panelType.prototype.parentPanel)
        {
            var level = panelSupportsObject(panelType, object, context);
            if (!bestLevel || (level && (level > bestLevel) ))
            {
                bestLevel = level;
                bestPanel = panelType;
            }

            if (FBTrace.DBG_PANELS)
                FBTrace.sysout("chrome.getBestPanelName panelType: " + panelType.prototype.name +
                    " level: " + level + " bestPanel: " +
                    (bestPanel ? bestPanel.prototype.name : "null") +
                    " bestLevel: " + bestLevel);
        }
    }

    return bestPanel ? bestPanel.prototype.name : null;
}

function getBestSidePanelName(sidePanelName, panelTypes)
{
    if (sidePanelName)
    {
        // Verify, that the suggested panel name is in the acceptable list
        for (var i = 0; i < panelTypes.length; ++i)
        {
            if (panelTypes[i].prototype.name == sidePanelName)
                return sidePanelName;
        }
    }

    // Default to the first panel type in the list
    return panelTypes.length ? panelTypes[0].prototype.name : null;
}

// ********************************************************************************************* //
// Event listeners

function browser1Loaded()
{
    if (FBTrace.DBG_INITIALIZE)
        FBTrace.sysout("browse1Loaded\n");

    var browser1 = panelBar1.browser;
    var browser2 = panelBar2.browser;
    Events.removeEventListener(browser1, "load", browser1Loaded, true);

    browser1.contentDocument.title = "Firebug Main Panel";
    browser1.complete = true;

    if (browser1.complete && browser2.complete)
    {
        // initializeUI is executed asynchronously, which solves the issue 3442
        // The problem has been introduced (from unknown reason) by revision R12210
        setTimeout(function() {
            FirebugChrome.initializeUI();  // the chrome bound into this scope
        });
    }

    if (FBTrace.DBG_INITIALIZE)
        FBTrace.sysout("browse1Loaded complete\n");
}

function browser2Loaded()
{
    if (FBTrace.DBG_INITIALIZE)
        FBTrace.sysout("browse2Loaded\n");

    var browser1 = panelBar1.browser;
    var browser2 = panelBar2.browser;
    Events.removeEventListener(browser2, "load", browser2Loaded, true);

    browser2.contentDocument.title = "Firebug Side Panel";
    browser2.complete = true;

    if (browser1.complete && browser2.complete)
    {
        // See browser1Loaded for more info.
        setTimeout(function() {
            FirebugChrome.initializeUI();  // the chrome bound into this scope
        });
    }

    if (FBTrace.DBG_INITIALIZE)
        FBTrace.sysout("browse2Loaded complete\n");
}

function onBlur(event)
{
    // XXXjjb this seems like a waste: called continuously to clear possible highlight I guess.
    // XXXhh Is this really necessary? I disabled it for now as this was preventing me
    // to show highlights on focus
    //Firebug.Inspector.highlightObject(null, Firebug.currentContext);

}

function onSelectLocation(event)
{
    var locationList = FirebugChrome.getElementById("fbLocationList");
    var location = locationList.repObject;

    FirebugChrome.navigate(location);
}

function onSelectingPanel(event)
{
    var panel = panelBar1.selectedPanel;
    var panelName = panel ? panel.name : null;

    if (FBTrace.DBG_PANELS)
        FBTrace.sysout("chrome.onSelectingPanel=" + panelName + " Firebug.currentContext=" +
            (Firebug.currentContext ? Firebug.currentContext.getName() : "undefined"));

    if (Firebug.currentContext)
    {
        Firebug.currentContext.previousPanelName = Firebug.currentContext.panelName;
        Firebug.currentContext.panelName = panelName;

        Firebug.currentContext.sidePanelName =
            Firebug.currentContext.sidePanelNames &&
            panelName in Firebug.currentContext.sidePanelNames
            ? Firebug.currentContext.sidePanelNames[panelName]
            : null;
    }

    if (panel)
        panel.navigate(panel.location);

    // Hide all toolbars now. It's a responsibility of the new selected panel to show
    // those toolbars, that are necessary. This avoids the situation, when naughty panel
    // doesn't clean up its toolbars. This must be done before 'showPanel', where visibility
    // of the BON buttons is managed.
    var toolbar = FirebugChrome.$("fbToolbarInner");
    var child = toolbar.firstChild;
    while (child)
    {
        Dom.collapse(child, true);
        child = child.nextSibling;
    }

    // Those extensions that don't use XUL overlays (e.g. bootstrapped extensions)
    // can provide toolbar buttons throug Firebug APIs.
    var panelToolbar = FirebugChrome.$("fbPanelToolbar");
    Dom.eraseNode(panelToolbar);

    if (panel)
    {
        // Get buttons from the current panel.
        var buttons;
        if (panel.getPanelToolbarButtons)
            buttons = panel.getPanelToolbarButtons();

        if (!buttons)
            buttons = [];

        Events.dispatch(Firebug.uiListeners, "onGetPanelToolbarButtons", [panel, buttons]);

        for (var i=0; i<buttons.length; ++i)
            Toolbar.createToolbarButton(panelToolbar, buttons[i]);

        Dom.collapse(panelToolbar, buttons.length == 0);
    }

    // Calling Firebug.showPanel causes dispatching 'showPanel' to all modules.
    var browser = panel ? panel.context.browser : Firefox.getCurrentBrowser();
    Firebug.showPanel(browser, panel);

    // Synchronize UI around panels. Execute the sync after 'showPanel' so the logic
    // can decide whether to display separators or not.
    // xxxHonza: The command line should be synced here as well.
    Firebug.chrome.syncLocationList();
    Firebug.chrome.syncStatusPath();

    //xxxjjb unfortunately the callstack side panel depends on the status path (sync after.)
    Firebug.chrome.syncSidePanels();
}

function onMouseScroll(event)
{
    if (Events.isControlAlt(event))
    {
        Events.cancelEvent(event);
        Firebug.Options.changeTextSize(-event.detail);
    }
}

function onSelectedSidePanel(event)
{
    var sidePanel = panelBar2.selectedPanel;
    if (Firebug.currentContext)
    {
        var panelName = Firebug.currentContext.panelName;
        if (panelName)
        {
            var sidePanelName = sidePanel ? sidePanel.name : null;
            Firebug.currentContext.sidePanelNames[panelName] = sidePanelName;
        }
    }

    if (FBTrace.DBG_PANELS)
        FBTrace.sysout("chrome.onSelectedSidePanel name=" +
            (sidePanel ? sidePanel.name : "undefined"));

    var panel = panelBar1.selectedPanel;
    if (panel && sidePanel)
        sidePanel.select(panel.selection);

    var browser = sidePanel ? sidePanel.context.browser : Firefox.getCurrentBrowser();
    // dispatch to modules
    Firebug.showSidePanel(browser, sidePanel);
}

function onPanelMouseOver(event)
{
    var object = Firebug.getRepObject(event.target);
    if (!object)
        return;

    var rep = Firebug.getRep(object, Firebug.currentContext);
    if (rep)
        rep.highlightObject(object, Firebug.currentContext, event.target);
}

function onPanelMouseOut(event)
{
    var object = Firebug.getRepObject(event.target);
    if (!object)
        return;

    var rep = Firebug.getRep(object, Firebug.currentContext);
    if (rep)
        rep.unhighlightObject(object, Firebug.currentContext, event.target);
}

function onPanelClick(event)
{
    var repNode = Firebug.getRepNode(event.target);
    if (repNode)
    {
        var object = repNode.repObject;
        var rep = Firebug.getRep(object, Firebug.currentContext);
        var realObject = rep ? rep.getRealObject(object, Firebug.currentContext) : null;
        var realRep = realObject ? Firebug.getRep(realObject, Firebug.currentContext) : rep;
        if (!realObject)
            realObject = object;

        if (Events.isLeftClick(event))
        {
            if (Css.hasClass(repNode, "objectLink"))
            {
                if (realRep)
                {
                    realRep.inspectObject(realObject, Firebug.currentContext);
                    Events.cancelEvent(event);
                }
            }
        }
    }
}

function onPanelMouseDown(event)
{
    if (Events.isLeftClick(event))
    {
        this.lastMouseDownPosition = {x: event.screenX, y: event.screenY};
    }
    else if (Events.isMiddleClick(event, true) && Events.isControlAlt(event))
    {
        Events.cancelEvent(event);
        Firebug.Options.setTextSize(0);
    }
    else if (Events.isMiddleClick(event) && Firebug.getRepNode(event.target))
    {
        // Prevent auto-scroll when middle-clicking a rep object
        Events.cancelEvent(event);
    }
}

function onPanelMouseUp(event)
{
    if (Events.isLeftClick(event))
    {
        var selection = event.target.ownerDocument.defaultView.getSelection();
        var target = selection.focusNode || event.target;
        if (selection.focusNode === selection.anchorNode)
        {
            var editable = Dom.getAncestorByClass(target, "editable");
            if (editable || Css.hasClass(event.target, "inlineExpander"))
            {
                var selectionData;
                var selFO = selection.focusOffset,selAO = selection.anchorOffset;

                // selection is collapsed
                if (selFO == selAO)
                {
                    var distance = Math.abs(event.screenX - this.lastMouseDownPosition.x) +
                        Math.abs(event.screenY - this.lastMouseDownPosition.y);

                    // If mouse has moved far enough, set selection at that point
                    if (distance > 3)
                        selectionData = {start: selFO, end: selFO};
                    // otherwise leave selectionData undefined to select all text
                }
                else if (selFO < selAO)
                {
                    selectionData = {start: selFO, end: selAO};
                }
                else
                {
                    selectionData = {start: selAO, end: selFO};
                }

                if (editable)
                {
                    Firebug.Editor.startEditing(editable, null, null, selectionData);
                }
                else
                {
                    Firebug.Editor.setSelection(selectionData || {start: selFO, end: selFO});
                    selection.removeAllRanges();
                }

                Events.cancelEvent(event);
            }
        }
    }
    else if (Events.isControlClick(event) || Events.isMiddleClick(event))
    {
        var repNode = Firebug.getRepNode(event.target);
        if (!repNode)
            return;

        var object = repNode.repObject;
        var rep = Firebug.getRep(object, Firebug.currentContext);
        var realObject = rep ? rep.getRealObject(object, Firebug.currentContext) : null;
        var realRep = realObject ? Firebug.getRep(realObject, Firebug.currentContext) : rep;
        if (!realObject)
            realObject = object;

        if (!realRep || !realRep.browseObject(realObject, Firebug.currentContext))
        {
            if (rep && !(rep != realRep && rep.browseObject(object, Firebug.currentContext)))
            {
                var panel = Firebug.getElementPanel(event.target);
                if (!panel || !panel.browseObject(realObject))
                    return;
            }
        }
        Events.cancelEvent(event);
    }
}

function onMainTabBoxMouseDown(event)
{
    if (Firebug.isInBrowser())
    {
        var contentSplitter = FirebugChrome.$("fbContentSplitter");
        // TODO: grab the splitter here.
    }
}

function stopBubble(event)
{
    event.stopPropagation();
}

function getRealObject(object)
{
    var rep = Firebug.getRep(object, Firebug.currentContext);
    var realObject = rep ? rep.getRealObject(object, Firebug.currentContext) : null;
    return realObject ? realObject : object;
}

function fatalError(summary, exc)
{
    if (typeof(FBTrace) !== undefined)
        FBTrace.sysout.apply(FBTrace, arguments);

    Components.utils.reportError(summary);

    throw exc;
}

return FirebugChrome;
 
}