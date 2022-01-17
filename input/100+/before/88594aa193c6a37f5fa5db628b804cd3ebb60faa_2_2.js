function(event)
    {
        var width = event.data;
        this._sidebarBackgroundElement.style.width = width + "px";
        this._scheduleRefresh(false);
        this._overviewPane.sidebarResized(width);
        // Min width = <number of buttons on the left> * 31
        this.statusBarFilters.style.left = Math.max((this.statusBarItems.length + 2) * 31, width) + "px";
        this._memoryStatistics.setSidebarWidth(width);
    }