function (that) {
        that.options.components = {
            pageBuilder: {
                type: "cspace.pageBuilder",
                options: {}
            }
        };
        
        that.initPageBuilder = function (options) {
            var resourceSpecs = {};
            that.options.readOnly = cspace.util.resolveReadOnly({
                permissions: options.userLogin.permissions,
                csid: that.options.csid,
                readOnly: options.readOnly,
                target: that.options.namespace || that.options.recordType
            });

            options.schema = options.schema || {};
            fluid.each(that.options.schema, function (resource, key) {
                var url = fluid.invoke("cspace.util.getDefaultSchemaURL", resource);
                resourceSpecs[resource] = {
                    href: url,
                    options: {
                        type: "GET",
                        dataType: "json",
                        success: function (data) {
                            if (!data) {
                                that.displayErrorMessage(fluid.stringTemplate(that.lookupMessage("emptyResponse"), {
                                    url: url
                                }));
                                return;
                            }
                            if (data.isError === true) {
                                fluid.each(data.messages, function (message) {
                                    that.displayErrorMessage(message);
                                });
                                return;
                            }
                            fluid.each(data, function (schema, key) {
                                options.schema[key] = schema;
                            });
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            cspace.util.provideErrorCallback(that, url, "errorFetching")(xhr, textStatus, errorThrown);
                            that.events.onError.fire();
                        }
                    }
                };
            });
            
            options.pageType = options.pageType || that.options.recordType;
            if (options.pageType) {
                var url = that.options.uispecUrl || fluid.invoke("cspace.util.getUISpecURL", options.pageType);
                resourceSpecs.uispec = {
                    href: url,
                    options: {
                        type: "GET",
                        dataType: "json",
                        success: function (data) {
                            if (!data) {
                                that.displayErrorMessage(fluid.stringTemplate(that.lookupMessage("emptyResponse"), {
                                    url: url
                                }));
                                return;
                            }
                            if (data.isError === true) {
                                fluid.each(data.messages, function (message) {
                                    that.displayErrorMessage(message);
                                });
                                return;
                            }
                            options.uispec = data;
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            cspace.util.provideErrorCallback(that, url, "errorFetching")(xhr, textStatus, errorThrown);
                            that.events.onError.fire();
                        }
                    }
                };
            }
            fluid.each(resourceSpecs,
                function (spec) {
                    spec.timeSuccess = true;
                }
            );
            
            var fetchCallback = function () {
                if (!options.htmlOnly) {
                    that.options.components.pageBuilder.options = options;
                    fluid.initDependent(that, "pageBuilder", that.instantiator);
                }
                that.events.pageReady.fire();
            };
            fluid.fetchResources(that.composite.compose(resourceSpecs), fetchCallback);
        };
    }