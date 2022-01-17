function (err, templateContext) {
        if (err instanceof Error) {
            renderUtils.replaceWithError(500, component, err);
            templateContext = component.context;
            componentConfig = componentRegistry.getConfig(component.id, component.version);
        }

        if (!templateContext) {
            templateContext = {};
        }

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
    }