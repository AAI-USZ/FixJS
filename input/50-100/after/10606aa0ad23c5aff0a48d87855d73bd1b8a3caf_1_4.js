function(settings) {
        var that = this;
        require(["text!" + this.manifest.WidgetRepositoryURL + "/"
                     + this.manifest.WidgetName + "/settings.mustache"], function(html) {
            console.log("loading widget settings");
            console.log(settings);
            var selector = "#" + that.manifest.WidgetName + "-widgetSettings";
            $(selector).replaceWith(html);
        });
    }