function (record) {
            model.tabs.push({
                "name": record + "-tab",
                type: record,
                href: fluid.stringTemplate(urlExpander(options.href), {
                    recordType: record
                })
            });
        }