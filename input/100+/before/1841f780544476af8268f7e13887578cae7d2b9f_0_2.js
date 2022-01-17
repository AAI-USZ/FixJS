function nameToAst(name) {
                name = (!options.wrapInFunction && aliasByGlobalName.hasOwnProperty(name) && aliasByGlobalName[name]) || name;
                var nameFragments = name.split('.');
                if (nameFragments.length > 1) {
                    return ['dot', nameToAst(nameFragments.slice(0, nameFragments.length - 1).join('.')), nameFragments[nameFragments.length - 1]];
                } else {
                    return ['name', nameFragments[0]];
                }
            }