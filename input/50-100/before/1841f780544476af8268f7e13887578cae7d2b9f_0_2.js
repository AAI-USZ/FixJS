function (name) {
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