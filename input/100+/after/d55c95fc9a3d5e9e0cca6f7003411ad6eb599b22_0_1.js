f        //STEP 1: apply parentage and things that only make sense when it is a child item
        if (parentConfig) {
            //preprocess
            if (glu.isString(config)) {
                if (config == '->' || config == '-' || config == '|') {
                    //skip - it's some other sort of shortcut string like for a menu item or button padding that can't be bound...
                    return {
                        config:config,
                        bindings:bindingsList
                    }
                }
                //otherwise, assume it's a name-bound field with the default type
                config = {
                    name:config
                };
            }
            //use cached adatper if available...
            var parentAdapter = parentAdapter || this.getAdapter(parentConfig);
            //default type is only if the collection is the items collection
            var defaultTypeForItems = parentPropName == 'items' ? parentConfig.defaultType : null;
            var adapterSpecificDefaultXtype = parentAdapter['defaultTypes'] ? parentAdapter.defaultTypes[parentPropName] : null;
            config.xtype = config.xtype || defaultTypeForItems || adapterSpecificDefaultXtype || 'panel';
            if (parentPropName == 'items' || parentPropName === undefined) { //apply parent defaults if in items container or unknown
                if (parentConfig.defaults) {
                    Ext.applyIf(config, parentConfig.defaults);
                }
                //apply default transforms from the parent
                if (parentConfig.defaultTransforms) {
                    config.transforms = config.transforms || parentConfig.defaultTransforms;
                }
            }
            //process inlining of other views (triggered by xtypes that don't appear to be registered with ExtJs)
            //by nature, this can only happen when parent information is available
            var isRegistered = this.isRegistered(config.xtype);
            if (config.xtype && !isRegistered) {
                var origXtype = config.xtype;
                delete config.xtype;
                //see if it starts with bind syntax, meaning it's a placeholder for a bound sub-model
                if (origXtype && origXtype.substring(0, 2) == '@{') {
                    var expr = origXtype.substring(2, origXtype.length - 1);
                    var split = this.traverseExpression(viewmodel, expr);
                    var target = split.model[split.prop];
                    var spec = glu.getViewSpec(target, viewmodel.ns, target.viewmodelName, config);
                    if (Ext.isString(spec))
                        throw spec;
                    //just inline the view and prepare for binding...
                    config = spec;
                    //must add actual xtype
                    config.xtype = config.xtype || defaultTypeForItems || adapterSpecificDefaultXtype || 'panel';
                    config.bindContext = expr;

                } else {
                    //see if it is a 'local type' and if so inline it
                    var spec = glu.getViewSpec(viewmodel, viewmodel.ns, origXtype, config);
                    if (!Ext.isString(spec)) {//getViewSpec returns error strings when it can't process the request. Deal with it.
                        config = spec;
                        config.xtype = config.xtype || defaultTypeForItems || adapterSpecificDefaultXtype || 'panel';
                    } else {
                        //put it back - it will throw an exception later
                        config.xtype = origXtype;
                    }
                }
            }

        }

        //STEP 2 : Initialize the actual binding by fetching the adapter, bindContext, and transforms
        glu.log.indentMore();
        config._bindingMap = config._bindingMap || {};
        config.xtype = config.xtype || 'panel'; //default to panel if nothing else found
        glu.log.debug(glu.log.indent + 'COLLECTING bindings for {xtype: ' + config.xtype + '}');
        bindingsList = bindingsList || [];
        //first, look for conventional name binding.
        var xtypeAdapter = this.getAdapter(config);
        var transformAdapters = [];
        if (config.transforms != null) {
            //transform additional adapters...
            for (var i = 0; i < config.transforms.length; i++) {
                transformAdapters.push(this.getAdapter({
                    xtype:config.transforms[i]
                }));
            }
        }
        //global adapters...
        for (var i = 0; i < glu.plugins.length; i++) {
            transformAdapters.push(this.getAdapter({
                xtype:glu.plugins[i]
            }));
        }

        //if bindContext is specified, then offset the viewmodel to that sub model.
        if (config.hasOwnProperty('bindContext')) {
            var traversalExpression = this.traverseExpression(viewmodel, config.bindContext);
            if (traversalExpression.model[traversalExpression.prop]) {
                viewmodel = traversalExpression.model[traversalExpression.prop];
            }
        }

        //STEP 3: Invoke any 'beforeCollect' adapters or plugins, and get a new adapter if it changed the xtype
        var origXtype = config.xtype;
        if (glu.isFunction(xtypeAdapter.beforeCollect)) {
            xtypeAdapter.beforeCollect(config, viewmodel);
        }
        for (var i = 0; i < transformAdapters.length; i++) {
            var origXtype = config.xtype;
            if (glu.isFunction(transformAdapters[i].beforeCollect)) {
                transformAdapters[i].beforeCollect(config, viewmodel);
            }
        }
        if (origXtype !== config.xtype) {
            //the before collect routines may have changed the xtype
            xtypeAdapter = this.getAdapter(config);
        }
        glu.fireEvent('beforecollect', config, viewmodel, parentPropName);


        //STEP 4: Apply any automatic conventions (supplied by adapter) based on the config.name property
        if (config.name != null) {
            //automatically find the best default property to bind to when binding by name
            if (glu.isFunction(xtypeAdapter.applyConventions)) {
                //perform automatic template-based name bindings
                xtypeAdapter.applyConventions(config, viewmodel);
            }
        }

        //STEP 5: Walk all of properties of the adapter
        var childContainerPropNames = [];

        for (var propName in config) {

            if (propName === 'xtype' || propName === 'ptype' || propName === '_defaultVm'
                || propName === 'id' || propName === '_bindings' || propName === '_bindingMap'
                || propName === 'name' || propName === 'rootVM') {
                //skip unbindable properties
                continue;
            }

            var value = config[propName];

            if (propName == 'listeners') {
                //manage listeners block which is special:
                config._bindingMap = config._bindingMap || {};
                config._bindingMap.listeners = config._bindingMap.listeners || {};
                var listeners = value;
                for (var propName in listeners) {
                    config._bindingMap.listeners[propName] = config.listeners[propName];
                    this.collectPropertyBinding(propName, config.listeners, viewmodel, true);
                }
                continue;
            }

            if (xtypeAdapter.isChildObject(propName, value)) {
                //process a special single child object like a menu or toolbar
                //we check for string because it may be a binding that will get pushed down a level
                if (glu.isString(value) || glu.isArray(value)) {
                    //appears to be an array shortcut for an actual single special item like a menu or toolbar...
                    var shortcutConverter = xtypeAdapter[propName + 'Shortcut'];
                    if (shortcutConverter) {
                        value = shortcutConverter(value);
                        config[propName] = value;
                    }
                    if (glu.isString(value) || glu.isArray(value)) {
                        throw "Failed to convert " + propName + " into a child object";
                    }
                }

                childContainerPropNames.push(propName);
                continue;
            }
            var isChildArray = xtypeAdapter.isChildArray(propName);
            if ((isChildArray && glu.isArray(value))) {
                //process a child array (like items or dockedItems), only if actually an array.
                //if a binding to a list, then simply collect the binding
                childContainerPropNames.push(propName);
                continue;
            }

            //By convention established by ExtJS, anything that ends with a "handler"
            //is a special shortcut event listener
            var isEventListener = propName == 'handler' || glu.symbol(propName).endsWith('Handler');

            //Finally, process this individual property binding
            this.collectPropertyBinding(propName, config, viewmodel, isEventListener, isChildArray);
        }

        if (glu.isFunction(xtypeAdapter.beforeCollectChildren)) {
            xtypeAdapter.beforeCollectChildren(config, viewmodel);
        }

        //STEP 6: Walk child objects
        function bindChildren() {
            for (var idx = 0; idx < childContainerPropNames.length; idx++) {
                var childContainerPropName = childContainerPropNames[idx];
                var childContainer = config[childContainerPropName];
                if (Ext.isArray(childContainer)) {
                    var newItems = [];
                    for (var i = 0; i < childContainer.length; i++) {
                        var childItem = childContainer[i];
                        var result = this.collectBindings(childItem, viewmodel, config, childContainerPropName, xtypeAdapter, bindingsList, indents + 1);
                        newItems.push(result.config);
                    }
                    config[childContainerPropName] = newItems;
                } else {
                    //otherwise do a simple recursion
                    this.collectBindings(childContainer, viewmodel, config, childContainerPropName, xtypeAdapter, bindingsList, indents + 1);
                }
            }
        }

        //do the actual child walk
        bindChildren.apply(this);

        //STEP 7: Call any beforeCreate on the adapter (now that the config is all prepared)
        if (glu.isFunction(xtypeAdapter.beforeCreate)) {
            xtypeAdapter.beforeCreate(config, viewmodel);
        }

        for (var i = 0; i < transformAdapters.length; i++) {
            if (glu.isFunction(transformAdapters[i].beforeCreate)) {
                var upshot = transformAdapters[i].beforeCreate(config, viewmodel) || {};
                //sometimes in rare case a transformer will need to rebind the children after a radical change
                if (upshot.rebindChildren) {
                    bindChildren.apply(this);
                }
            }
        }

        //STEP 8: add the 'afterCreate' plugin from the adapter to the ExtJS control to
        //"normalize" the control on creation. DOES NOT APPLY BINDING, just "converts" ExtJS control
        //to glu control as needed without affecting ExtJS prototypes or creating new widgets
        if (!(config.plugins && config.plugins.addedBinderPlugin)) {
            if (Ext.getProvider().provider == 'touch') {
                config.plugins = config.plugins || [];
                config.plugins.addedBinderPlugin = true;
                Ext.define('Ext.plugin.' + xtypeAdapter.name + 'Plugin', {
                    isBinderPlugin:true,
                    alias:'plugin.' + xtypeAdapter.name + 'Plugin',
                    //xtype:'Ext.plugin.adapterPlugin',
                    init:function (control) {
                        if (glu.isFunction(xtypeAdapter.afterCreate)) {
                            xtypeAdapter.afterCreate(control, viewmodel);
                        }
                        for (var i = 0; i < transformAdapters.length; i++) {
                            var tAdapter = transformAdapters[i];
                            if (glu.isFunction(tAdapter.afterCreate)) {
                                tAdapter.afterCreate(control, viewmodel);
                            }
                        }
                    }
                });
                config.plugins.push(xtypeAdapter.name + 'Plugin');

            }
            else {
                config.plugins = config.plugins || [];
                config.plugins.addedBinderPlugin = true;
                config.plugins.push({
                    isBinderPlugin:true,
                    init:function (control) {
                        if (glu.isFunction(xtypeAdapter.afterCreate)) {
                            xtypeAdapter.afterCreate(control, viewmodel);
                        }
                        for (var i = 0; i < transformAdapters.length; i++) {
                            var tAdapter = transformAdapters[i];
                            if (glu.isFunction(tAdapter.afterCreate)) {
                                tAdapter.afterCreate(control, viewmodel);
                            }
                        }
                    }
                });
            }
        }

        //STEP 9: Store the binding in the list and return
        if (config._bindings != null && config._bindings.length > 0) {
            config.id = config.id || Ext.id();
            config._bindings.defaultModel = viewmodel;
            config._bindings.adapter = xtypeAdapter;
            bindingsList.push(config);
        }
        glu.log.indentLess();
        return {
            config:config,
            bindings:bindingsList
        }
    },
