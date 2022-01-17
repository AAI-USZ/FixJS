function (resource, key) {
                var url = fluid.invoke("cspace.util.getDefaultSchemaURL", key);
                resourceSpecs[key] = {
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
            }