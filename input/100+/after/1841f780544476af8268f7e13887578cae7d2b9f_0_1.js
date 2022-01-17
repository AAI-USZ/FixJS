function () {
                    var stack = walker.stack(),
                        node = stack[stack.length - 1],
                        name = uglifyJs.uglify.gen_code(node);

                    if (name in globalsObj) {
                        if (!hasOwnProperty.call(occurrencesByGlobalName, name)) {
                            occurrencesByGlobalName[name] = [];
                        }
                        occurrencesByGlobalName[name].push(node);
                    } else if (node[2].length > 2) {
                        // .foo() => [a]() won't save anything if the method name is 2 chars or less

                        if (!hasOwnProperty.call(occurrencesByString, node[2])) {
                            occurrencesByString[node[2]] = [];
                        }
                        occurrencesByString[node[2]].push(node);
                    }
                }