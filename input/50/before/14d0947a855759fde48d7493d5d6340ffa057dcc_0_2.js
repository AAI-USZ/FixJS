function (type) {
                    return invokeInfo.mimeType.match(type["#text"][0].replace("*", ""));
                }