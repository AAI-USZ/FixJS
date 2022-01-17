function (options, records) {
        var urlExpander = fluid.invoke("cspace.urlExpander");
        var model = {
            tabs: [{
                "name": "tablist-primary",
                href: "#primaryTab"
            }]
        };
        fluid.each(records, function (record) {
            model.tabs.push({
                "name": record,
                href: urlExpander(options.href)
            });
        });
        return model;
    }