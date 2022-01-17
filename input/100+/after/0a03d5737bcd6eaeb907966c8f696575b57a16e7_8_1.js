function (resourceSpec, name) {
            if (typeof that.options.resources[name] === "undefined") {
                return;
            }
            if (!resourceSpec) {
                return;
            }
            compositeCallbacks[name] = {
                success: resourceSpec.options.success,
                error: resourceSpec.options.error
            };
            var prefixIndex = resourceSpec.href.indexOf(urls.prefix);
            resourceSpec.href = prefixIndex < 0 ? resourceSpec.href : resourceSpec.href.substr(prefixIndex + urls.prefix.length);
            resourceSpecs.composite.options.data[name] = that.transform(resourceSpec, {
                "path": "href",
                "method": "options.type",
                "dataType": "options.dataType"
            });
            return true;
        }