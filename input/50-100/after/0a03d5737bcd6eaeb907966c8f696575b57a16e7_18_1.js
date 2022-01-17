function (options, records) {
        var urlExpander = fluid.invoke("cspace.urlExpander");
        var model = {
            tabs: [{
                "name": "tablist-primary",
                href: "#primaryTab",
                title: "tablist-primary"
            }]
        };
        fluid.each(records, function (record) {
            model.tabs.push({
                "name": record,
                title: record + "-tab",
                href: urlExpander(options.href)
            });
        });
        return model;
    }