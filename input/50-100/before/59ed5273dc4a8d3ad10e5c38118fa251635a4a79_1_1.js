function (event, trigger) {
        if (event === "invoked") {
            if (_startupMode !== _application.invocation.LAUNCH) {
                trigger();
                _startupMode = _application.invocation.LAUNCH;
            }
            window.qnx.webplatform.getApplication().invocation.addEventListener("Invoked", trigger);
        }
        else {
            console.log("Ignore registration for unknown event: " + event);
        }
    }