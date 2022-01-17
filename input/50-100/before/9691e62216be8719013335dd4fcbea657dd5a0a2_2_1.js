function(inputdata) {
                var lines = inputdata.split("\n");
                for (var i in lines) {
                    if (lines[i].search(/Permalink/) == -1) {
                        lines[i] = replaceSoupLinksInString(lines[i]);
                    }
                }

                return new Buffer(lines.join("\n"));
            }