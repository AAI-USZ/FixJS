function () {
                var onInvokedInfo = JSON.parse(window.qnx.webplatform.getApplication().invocation.getRequest());
                _event.trigger("invoked", onInvokedInfo);
            }