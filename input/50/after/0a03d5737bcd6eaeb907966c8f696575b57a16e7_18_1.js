function (record) {
            model.tabs.push({
                "name": record,
                title: record + "-tab",
                href: urlExpander(options.href)
            });
        }