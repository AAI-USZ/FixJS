function(mnfst, dgst) {
        this.manifest = mnfst;
        this.digest = dgst;
        _.bindAll(this);
        this.init();
        var that = this;
        $("#" + mnfst.WidgetName + "-widget-settings").click(function () {
            console.log("widget settings...");
            that.settings();
        });
    }