function (session, config, callback) {
        var context = {
                session: session,
                config: config
            },
            workflow = buildWorkflow(session, context);

        if (workflow) {
            workflow.start({
                "callback": callback
            });
        }
    }