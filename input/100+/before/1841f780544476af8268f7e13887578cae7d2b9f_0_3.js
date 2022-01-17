function (globalName) {
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
            }