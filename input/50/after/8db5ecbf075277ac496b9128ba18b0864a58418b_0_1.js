function (suffixes) {
                    var i, result = [];
                    for (i = 0; i < suffixes.length; i += 1) {
                        result.push(cls(suffixes[i]));
                    }
                    return result;
                }