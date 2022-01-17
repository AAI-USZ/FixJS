function (component, transport) {
    var self = this;
    var componentConfig = componentRegistry.getConfig(component.id, component.version);

    var time = Date.now();
    dataLayer.loadData({
        id: component.id,
        viewId: component.view,
        version: component.version,
        context: component.context,
        session: component.session,
        request: component.request,
        environment: component.environment
    }, function (err, templateContext) {
        console.debug("Data loading time:", Date.now() - time, 'ms');

        if (err instanceof Error) {
            renderUtils.replaceWithError(500, component, err);
            templateContext = component.context;
            componentConfig = componentRegistry.getConfig(component.id, component.version);
        }

        if (!templateContext) {
            templateContext = {};
        }

        var renderingTime = Date.now();
        self.sendComponent(transport, {
            component: componentConfig,
            viewId: component.view,
            staticId: component.sid,
            instanceId: component.instanceId,
            context: templateContext,
            rain: self.createRainContext({
                transport: transport,
                session: component.session,
                request: component.request,
                environment: component.environment
            }),
            fn: component.fn
        });

        console.debug("Rendering time:", Date.now() - renderingTime, 'ms');
        console.debug("Reponse time for the component:", Date.now() - time, 'ms');
    });
}