function (thisDisplayName, index) {
                        var elem = {};
                        elem[urn] = match[baseUrn].concat("'", thisDisplayName, "'");
                        elem[displayName] = thisDisplayName;
                        elem[preferred] = index === 0;
                        elem[type] = match.type;
                        elem[csid] = match.csid;
                        return elem;
                    }