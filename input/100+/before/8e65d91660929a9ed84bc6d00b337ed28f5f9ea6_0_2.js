function (xdr) {
                    var responseBody = xdr.responseText;
                    var isJunkEnded = false;

                    if (responseBody.indexOf("<!-- Welcome to the Atmosphere Framework.") != -1) {
                        isJunkEnded = true;
                    }

                    if (isJunkEnded) {
                        var endOfJunk = "<!-- EOD -->";
                        var endOfJunkLength = endOfJunk.length;
                        var junkEnd = responseBody.indexOf(endOfJunk) + endOfJunkLength;

                        responseBody = responseBody.substring(junkEnd + lastIndex);
                        lastIndex += responseBody.length;
                    }

                    _prepareCallback(responseBody, "messageReceived", 200, transport);
                }