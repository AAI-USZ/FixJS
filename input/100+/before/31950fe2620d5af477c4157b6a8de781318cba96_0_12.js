function _f(response, f) {
                switch (response.state) {
                    case "messageReceived" :
                        if (typeof(f.onMessage) != 'undefined') f.onMessage(response);
                        break;
                    case "error" :
                        if (typeof(f.onError) != 'undefined') f.onError(response);
                        break;
                    case "opening" :
                        if (typeof(f.onOpen) != 'undefined') f.onOpen(response);
                        break;
                    case "messagePublished" :
                        if (typeof(f.onMessagePublished) != 'undefined') f.onMessagePublished(response);
                        break;
                    case "re-opening" :
                        if (typeof(f.onReconnect) != 'undefined') f.onReconnect(_request, response);
                        break;
                    case "closed" :
                        if (typeof(f.onClose) != 'undefined') f.onClose(response);
                        break;
                }
            }