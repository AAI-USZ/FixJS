function (ex, type, message) {
                        result = { ex: ex, type: type, message: message };
                        context.onError(message);
                        container.html(message);
                    }