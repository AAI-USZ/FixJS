function (javaScriptAsset) {
            var occurrencesByGlobalName = {},
                occurrencesByString = {},
                ast = javaScriptAsset.parseTree,
                walker = uglifyJs.uglify.ast_walker(),
                seenNames = {}, // To avoid collisions when introducing new vars
                seenLocals = {}; // To avoid aliasing globals that are shadowed by a local var somewhere
            walker.with_walkers({
                dot: function () {
                    var stack = walker.stack(),
                        node = stack[stack.length - 1],
                        name = uglifyJs.uglify.gen_code(node);

                    if (name in globalsObj) {
                        if (!occurrencesByGlobalName.hasOwnProperty(name)) {
                            occurrencesByGlobalName[name] = [];
                        }
                        occurrencesByGlobalName[name].push(node);
                    } else if (node[2].length > 2) {
                        // .foo() => [a]() won't save anything if the method name is 2 chars or less

                        if (!Object.prototype.hasOwnProperty.call(occurrencesByString, node[2])) {
                            occurrencesByString[node[2]] = [];
                        }
                        occurrencesByString[node[2]].push(node);
                    }
                },
                defun: function (name) {
                    seenLocals[name] = true;
                },
                function: function (name) {
                    if (name) {
                        seenLocals[name] = name;
                    }
                },
                var: function (vars) {
                    vars.forEach(function (v) {
                        seenNames[v[0]] = true;
                        seenLocals[v[0]] = true;
                    });
                },
                string: function (string) {
                    var stack = walker.stack(),
                        node = stack[stack.length - 1];
                    if (!Object.prototype.hasOwnProperty.call(occurrencesByString, string)) {
                        occurrencesByString[string] = [];
                    }
                    occurrencesByString[string].push(node);
                },
                name: function (name) {
                    seenNames[name] = true;
                    if (name in globalsObj) {
                        var stack = walker.stack(),
                            node = stack[stack.length - 1];
                        if (!occurrencesByGlobalName.hasOwnProperty(name)) {
                            occurrencesByGlobalName[name] = [];
                        }
                        occurrencesByGlobalName[name].push(node);
                    }
                }
            }, function() {
                walker.walk(ast);
            });
            // Order by number of dots ascending so e.g. Math is considered before Math.min:
            var globalNames = Object.keys(occurrencesByGlobalName).sort(function (a, b) {
                return a.split('.').length - b.split('.').length;
            });
            var aliasDeclarations = [],
                aliasByGlobalName = {};

            function nameToAst(name) {
                name = (!options.wrapInFunction && aliasByGlobalName.hasOwnProperty(name) && aliasByGlobalName[name]) || name;
                var nameFragments = name.split('.');
                if (nameFragments.length > 1) {
                    return ['dot', nameToAst(nameFragments.slice(0, nameFragments.length - 1).join('.')), nameFragments[nameFragments.length - 1]];
                } else {
                    return ['name', nameFragments[0]];
                }
            }

            globalNames.forEach(function (globalName) {
                if (!seenLocals.hasOwnProperty(globalName) && occurrencesByGlobalName[globalName].length > 1) {
                    var alias = globalName.replace(/\./g, '').toUpperCase();
                    while (seenNames.hasOwnProperty(alias)) {
                        alias += '_';
                    }
                    seenNames[alias] = true;
                    aliasDeclarations.push({name: alias, valueAst: nameToAst(globalName)});
                    occurrencesByGlobalName[globalName].forEach(function (occurrence) {
                        occurrence.splice(0, occurrence.length, 'name', alias);
                    });
                    aliasByGlobalName[globalName] = alias;
                } else {
                    delete occurrencesByGlobalName[globalName];
                }
            });

            if (options.stringLiterals) {
                Object.keys(occurrencesByString).forEach(function (string) {
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
                });
            }

            if (aliasDeclarations.length) {
                if (options.wrapInFunction) {
                    ast[1] = [
                        [
                            'stat',
                            [
                                'call',
                                [
                                    'function',
                                    null,
                                    _.pluck(aliasDeclarations, 'name'),
                                    ast[1]
                                ],
                                _.pluck(aliasDeclarations, 'valueAst')
                            ]
                        ]
                    ];
                } else {
                    Array.prototype.unshift.apply(ast[1], aliasDeclarations.map(function (aliasDeclaration) {
                        return ['var', [[aliasDeclaration.name, aliasDeclaration.valueAst]]];
                    }));
                }
                javaScriptAsset.markDirty();
            }
        }