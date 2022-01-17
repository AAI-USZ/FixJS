function (module, config) {
        var include, override, layer, context, baseConfig, oldContext,
            registry, id, idParts, pluginId,
            errMessage = '',
            failedPluginMap = {},
            failedPluginIds = [],
            errIds = [],
            errUrlMap = {},
            errUrlConflicts = {},
            hasErrUrl = false,
            errUrl, prop;

        //Reset some state set up in requirePatch.js, and clean up require's
        //current context.
        oldContext = require._buildReset();

        //Grab the reset layer and context after the reset, but keep the
        //old config to reuse in the new context.
        baseConfig = oldContext.config;
        layer = require._layer;
        context = layer.context;

        //Put back basic config, use a fresh object for it.
        //WARNING: probably not robust for paths and packages/packagePaths,
        //since those property's objects can be modified. But for basic
        //config clone it works out.
        require(lang.mixin({}, baseConfig, true));

        logger.trace("\nTracing dependencies for: " + (module.name || module.out));
        include = module.name && !module.create ? [module.name] : [];
        if (module.include) {
            include = include.concat(module.include);
        }

        //If there are overrides to basic config, set that up now.;
        if (module.override) {
            override = lang.mixin({}, baseConfig, true);
            lang.mixin(override, module.override, true);
            require(override);
        }

        //Figure out module layer dependencies by calling require to do the work.
        require(include);

        //Reset config
        if (module.override) {
            require(baseConfig);
        }

        //Check to see if it all loaded. If not, then stop, and give
        //a message on what is left.
        registry = context.registry;
        for (id in registry) {
            if (registry.hasOwnProperty(id) && id.indexOf('_@r') !== 0) {
                if (id.indexOf('_unnormalized') === -1 && registry[id].enabled) {
                    errIds.push(id);
                    errUrl = registry[id].map.url;

                    if (errUrlMap[errUrl]) {
                        hasErrUrl = true;
                        //This error module has the same URL as another
                        //error module, could be misconfiguration.
                        if (!errUrlConflicts[errUrl]) {
                            errUrlConflicts[errUrl] = [];
                            //Store the original module that had the same URL.
                            errUrlConflicts[errUrl].push(errUrlMap[errUrl]);
                        }
                        errUrlConflicts[errUrl].push(id);
                    } else {
                        errUrlMap[errUrl] = id;
                    }
                }

                //Look for plugins that did not call load()
                idParts = id.split('!');
                pluginId = idParts[0];
                if (idParts.length > 1 && !failedPluginMap.hasOwnProperty(pluginId)) {
                    failedPluginIds.push(pluginId);
                    failedPluginMap[pluginId] = true;
                }
            }
        }

        if (errIds.length || failedPluginIds.length) {
            if (failedPluginIds.length) {
                errMessage += 'Loader plugin' +
                (failedPluginIds.length === 1 ? '' : 's') +
                ' did not call ' +
                'the load callback in the build: ' +
                failedPluginIds.join(', ') + '\n';
            }
            errMessage += 'Module loading did not complete for: ' + errIds.join(', ');

            if (hasErrUrl) {
                errMessage += '\nThe following modules share the same URL. This ' +
                              'could be a misconfiguration if that URL only has ' +
                              'one anonymous module in it:';
                for (prop in errUrlConflicts) {
                    if (errUrlConflicts.hasOwnProperty(prop)) {
                        errMessage += '\n' + prop + ': ' +
                                      errUrlConflicts[prop].join(', ');
                    }
                }
            }
            throw new Error(errMessage);
        }

        return layer;
    }