function(template) {
            var html = template.render({"manifest" : that.manifest});
            App.makeModal(html);
            that.loadWidgetSettings();
        }