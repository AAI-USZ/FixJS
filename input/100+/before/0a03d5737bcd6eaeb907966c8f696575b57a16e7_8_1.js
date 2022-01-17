function (resourceSpec, name) {
            if ($.inArray(name, that.options.resources) < 0) {
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