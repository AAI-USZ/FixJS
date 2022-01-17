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

        this._loadUISourceCodes();
    }