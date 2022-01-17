function (string) {
                    var stack = walker.stack(),
                        node = stack[stack.length - 1];
                    if (!hasOwnProperty.call(occurrencesByString, string)) {
                        occurrencesByString[string] = [];
                    }
                    occurrencesByString[string].push(node);
                }