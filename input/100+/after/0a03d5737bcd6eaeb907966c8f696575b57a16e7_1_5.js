function (applier, model, resolve, options, permission, selector) {
        var types = fluid.transform(model.authorities, function (auth) {
            // We only need an authority not the vocabulary.
            return auth.type.split("-")[0];
        });
        options.oneOf = types;
        if (!fluid.invokeGlobalFunction(resolve, [options])) {
            selector.prop("disabled", true);
        }
        var authorities = fluid.remove_if(fluid.copy(model.authorities), function (auth) {
            return !cspace.permissions.resolve({
                resolver: options.resolver,
                permission: permission,
                // We only need an authority not the vocabulary.
                target: auth.type.split("-")[0]
            });
        });
        applier.requestChange("authorities", authorities);
    }