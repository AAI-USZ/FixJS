function () {
                var result = controller.checkSession.apply(controller, _arguments);

                if (isDeferred(result)) {
                    return result;
                } else {
                    return assertDeferredByResult(new $.Deferred(), result);
                }
            }