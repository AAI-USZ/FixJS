function(preserveItems)
    {
        delete this.currentQuery;
        this.searchCanceled();

        this._debuggerResumed();

        delete this._currentUISourceCode;
        this._navigator.reset();
        this._editorContainer.reset();
        this._updateScriptViewStatusBarItems();
        this.sidebarPanes.jsBreakpoints.reset();
        this.sidebarPanes.watchExpressions.reset();
        if (!preserveItems && this.sidebarPanes.workers)
            this.sidebarPanes.workers.reset();
        WebInspector.RevisionHistoryView.reset();

        var uiSourceCodes = this._workspace.uiSourceCodes();
        for (var i = 0; i < uiSourceCodes.length; ++i)
            this._removeSourceFrame(uiSourceCodes[i]);

        this._loadUISourceCodes();
    }