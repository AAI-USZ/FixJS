function _buffering(message, request, response) {
                function ends(string, w) {
                    return w == string.substr(string.length - w.length);
                }

                if (response.bufferBody)
                    message = response.bufferBody + message;

                if (!ends(message, request.messageDelimiter)) {
                    var messages = message.split(_request.messageDelimiter), lastMessage = messages.pop();

                    response.bufferBody = lastMessage;

                    if (!messages.length) return true;

                    response.responseBody = messages.join(request.messageDelimiter);
                } else {
                    response.responseBody = message;
                    response.bufferBody = '';
                }

                return false
            }