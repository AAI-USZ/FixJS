function (request) {
                var onInvokedInfo = JSON.parse(request);

                // Workaround for double invoke bug
                if (onInvokedInfo.uri !== "invoke://localhost") {
                    _event.trigger("invoked", onInvokedInfo);
                }
            }