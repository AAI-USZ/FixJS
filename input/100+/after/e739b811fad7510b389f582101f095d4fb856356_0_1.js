function(event)
    {
        var mode = event.data;
        var shouldShowMemory = mode === WebInspector.TimelineOverviewPane.Mode.Memory;
        var frameMode = mode === WebInspector.TimelineOverviewPane.Mode.Frames;
        this._overviewModeSetting.set(mode);
        if (frameMode !== this._frameMode) {
            this._frameMode = frameMode;
            this._glueParentButton.disabled = frameMode;
            this._presentationModel.setGlueRecords(this._glueParentButton.toggled && !frameMode);
            this._repopulateRecords();

            if (frameMode) {
                this.element.addStyleClass("timeline-frame-overview");
                this._frameController = new WebInspector.TimelineFrameController(this._model, this._overviewPane, this._presentationModel);
            } else {
                this._frameController.dispose();
                this._frameController = null;
                this.element.removeStyleClass("timeline-frame-overview");
            }
        }
        if (shouldShowMemory === this._memoryStatistics.visible())
            return;
        if (!shouldShowMemory) {
            this._timelineMemorySplitter.addStyleClass("hidden");
            this._memoryStatistics.hide();
            this.splitView.element.style.height = "auto";
            this.splitView.element.style.bottom = "0";
            this.onResize();
        } else {
            this._timelineMemorySplitter.removeStyleClass("hidden");
            this._memoryStatistics.show();
            this.splitView.element.style.bottom = "auto";
            this._setSplitterPosition(WebInspector.settings.memoryCounterGraphsHeight.get());
        }
    }