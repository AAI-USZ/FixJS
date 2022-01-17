function(chunk) {
                var replacement = block.code.replacement;
                if(replacement) {
                    replacement = replacement.replace(/\$\-/g, chunk);
                }

                rl.pause();
                rl.removeAllListeners("line");

                if(DEBUG) {
                    console.log("STDIN:", replacement + ".");
                }

                if(block.code.match.test(data)) {
                    if(block.code.flags.contains("o")) {
                        callback(data);
                    } else {
                        block.perform_match(block.code.match, replacement, data, callback);
                    }
                } else {
                    if(block.code.flags.contains("o")) {
                        block.perform_match(/^.*$/, replacement, data, callback);
                    } else {
                        callback(data);
                    }
                }
            }