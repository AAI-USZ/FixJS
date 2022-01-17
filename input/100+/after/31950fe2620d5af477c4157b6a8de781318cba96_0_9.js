function (xdr) {
                    var responseBody = xdr.responseText;
                    var isJunkEnded = false;

                    if (responseBody.indexOf("<!-- Welcome to the Atmosphere Framework.") != -1) {
                        isJunkEnded = true;
                    }

                    if (isJunkEnded) {
                        var endOfJunk = "<!-- EOD -->";
                        var endOfJunkLenght = endOfJunk.length;
                        var junkEnd = responseBody.indexOf(endOfJunk);
                        if (junkEnd !== -1) {
                            responseBody = responseBody.substring(junkEnd + endOfJunkLenght + lastIndex);
                            lastIndex += responseBody.length;
                        }
                    }

                    _prepareCallback(responseBody, "messageReceived", 200, transport);
                }