function(chunk) {
                var args = arguments;
                return chunk.map(function(chunk) {
                    var handler = function(result) {
                        if (args[3] === "exists")
                            return chunk.exists(result, args[1], args[2]).end();

                        if (args[3] === "notexists")
                            return chunk.notexists(result, args[1], args[2]).end();

                        return (args[2] === null)
                             ? chunk.reference(result, args[1], args[3].auto, args[3].filters).end()
                             : chunk.section(result, args[1], args[2], args[3]).end();
                    }
                    listeners.push(handler);
                });
            }