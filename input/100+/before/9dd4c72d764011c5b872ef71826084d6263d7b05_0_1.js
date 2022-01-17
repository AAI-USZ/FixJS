function (model, applier, that) {
                var matches = [],
                    preferred = that.options.elPaths.preferred,
                    displayName = that.options.elPaths.displayName,
                    displayNames = that.options.elPaths.displayNames,
                    urn = that.options.elPaths.urn,
                    baseUrn = that.options.elPaths.baseUrn,
                    matchesPath = that.options.elPaths.matches;
                fluid.each(fluid.get(model, matchesPath), function (match) {
                    var vocab = cspace.vocab.resolve({
                        recordType: match.type,
                        model: match,
                        vocab: that.vocab
                    }), displayNameList = fluid.get(match, displayNames);

                    if (!that.vocab.isNptAllowed(vocab, match.type)) {
                        displayNameList = displayNameList.slice(0, 1);
                    }

                    matches = matches.concat(fluid.transform(displayNameList, function (thisDisplayName, index) {
                        var elem = {};
                        elem[urn] = match[baseUrn].concat("'", thisDisplayName, "'");
                        elem[displayName] = thisDisplayName;
                        elem[preferred] = index === 0;
                        return elem;
                    }));
                });
                that.applier.requestChange("matches", matches);
            }