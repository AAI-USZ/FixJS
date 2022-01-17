function(html) {
            var selector = "#" + that.manifest.WidgetName + "-widgetSettings";
            $(selector).replaceWith(html);
        }