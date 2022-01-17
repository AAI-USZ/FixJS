function (intent, acknowledge) {
        if (!intent.category) {
            acknowledge(new RainError("You must specify intent category.",
                RainError.ERROR_PRECONDITION_FAILED, 'category'));
            return;
        }

        if (!intent.action) {
            acknowledge(new RainError("You must specify intent action.",
                RainError.ERROR_PRECONDITION_FAILED, 'action'));
            return;
        }

        if (!intent.context) {
            acknowledge(new RainError("You must specify intent context",
                RainError.ERROR_PRECONDITION_FAILED, 'context'));
            return;
        }

        try {
            handler = resolveIntent(intent.category, intent.action);
        } catch (ex) {
            acknowledge(ex);
            return;
        }

        switch (handler.type) {
            case 'view':
                var mainComponent = componentRegistry.getConfig('core',
                                                componentRegistry.getLatestVersion('core'));
                var env = mainComponent.environment = new Environment(socket.session);

                //create customContext for the view
                var context = extend({}, intent.context,
                    {
                        cmp: {
                            name: handler.provider.component,
                            view: handler.provider.view,
                            version: handler.provider.version
                        }
                    }
                );
                //remove instanceId
                delete context.instanceId;

                renderer.sendComponent(socket, {
                    component: mainComponent,
                    viewId: 'dialog',
                    instanceId: intent.context.instanceId,
                    context: context,
                    rain: renderer.createRainContext({
                        component: handler.component,
                        transport: socket,
                        session: socket.session,
                        environment: env
                    })
                });
                break;
            case 'server':
                var component = {
                    id: handler.provider.component,
                    version: handler.provider.version,
                    intentPermissions: handler.provider.permissions,
                    session: socket.session
                };

                if (!renderUtils.isAuthorized(component, renderUtils.AUTHORIZATION_TYPE_INTENT)) {
                    acknowledge(new RainError('Unauthorized access to component %s!',
                          [component.id], RainError.ERROR_HTTP, 401));
                    return;
                }

                try {
                    var controller = require(handler.provider.controllerPath);
                    controller[handler.provider.method](intent.context, acknowledge);
                } catch (ex) {
                    acknowledge(new RainError('Internal intent error for component %s!',
                          [component.id], RainError.ERROR_HTTP, 500));
                    return;
                }
                break;
        }
    }