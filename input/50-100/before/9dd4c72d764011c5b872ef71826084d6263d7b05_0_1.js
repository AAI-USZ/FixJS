function (thisDisplayName, index) {
                        var elem = {};
                        elem[urn] = match[baseUrn].concat("'", thisDisplayName, "'");
                        elem[displayName] = thisDisplayName;
                        elem[preferred] = index === 0;
                        return elem;
                    }