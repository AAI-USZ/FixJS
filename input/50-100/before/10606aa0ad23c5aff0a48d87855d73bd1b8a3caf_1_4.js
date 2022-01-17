function() {
        var that = this;
        require(["text!" + this.manifest.WidgetRepositoryURL + "/"
                     + this.manifest.WidgetName + "/settings.mustache"], function(html) {
            var selector = "#" + that.manifest.WidgetName + "-widgetSettings";
            $(selector).replaceWith(html);
        });
    }