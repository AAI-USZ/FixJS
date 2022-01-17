function (ex, type, message) {
                        result = { ex: ex, type: type, message: message };
                        context.onError(!!ex ? ex.responseText : message);
                        container.html(!!ex ? ex.responseText : message);
                    }