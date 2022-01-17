function(widgetInfo, dgst) {
        this.manifest = widgetInfo.manifest;
        this.digest = dgst;
        _.bindAll(this);
        this.init();
        var that = this;
        if (this.manifest.HasSettings) {
            this.settings = widgetInfo.settings;
            $("#" + widgetInfo.manifest.WidgetName + "-widget-settings").click(function () {
                that.settings(that.settings);
            });
        }
    }