function (session, config, extManager, callback) {
        var context = {
                session: session,
                config: config,
                extManager: extManager
            },
            workflow = buildWorkflow(session, context);

        if (workflow) {
            workflow.start({
                "callback": callback
            });
        }
    }