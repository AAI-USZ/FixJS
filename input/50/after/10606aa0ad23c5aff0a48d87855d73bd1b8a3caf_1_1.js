function(html) {
            console.log("loading widget settings");
            console.log(settings);
            var selector = "#" + that.manifest.WidgetName + "-widgetSettings";
            $(selector).replaceWith(html);
        }