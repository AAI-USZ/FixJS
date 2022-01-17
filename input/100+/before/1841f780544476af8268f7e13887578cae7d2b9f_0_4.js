function (string) {
                    var occurrences = occurrencesByString[string],
                        savedBytes = -string.length - 5;
                    occurrences.forEach(function (occurrence) {
                        if (occurrence[0] === 'string') {
                            savedBytes += string.length + 4;
                        } else {
                            // dot
                            savedBytes += string.length - 3;
                        }
                    });

                    if (occurrences.length >= 2) {
                        var alias = string || 'EMPTY';
                        Object.keys(symbolNames).forEach(function (symbol) {
                            while (alias.indexOf(symbol) !== -1) {
                                alias = alias.replace(symbol, symbolNames[symbol]);
                            }
                        });

                        if (/^[0-9]/.test(alias)) {
                            alias = '_' + alias;
                        }
                        alias = alias.replace(/[^a-z0-9_]/gi, '').toUpperCase();
                        while (!alias || Object.prototype.hasOwnProperty.call(seenNames, alias)) {
                            alias += '_';
                        }
                        seenNames[alias] = true;
                        aliasDeclarations.push({name: alias, valueAst: ['string', string]});
                        occurrences.forEach(function (occurrence) {
                            if (occurrence[0] === 'string') {
                                occurrence.splice(0, occurrence.length, 'name', alias);
                            } else {
                                // dot
                                occurrence.splice(0, occurrence.length, 'sub', occurrence[1], ['name', alias]);
                            }
                        });
                    }
                }