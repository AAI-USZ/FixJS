function (name, values) {
            return function (record) {
                if (name == "elevation" || name == "date") {
                    if (name == "date")
                            var t = new Date(record[name]);
                    else
                            var t = record[name];
                    
                    if (record[name] != null && t >= values[0] && t <= values[1]) {
                            return record;
                    }
                } else {
                    for (var j = 0; j < values.length; j++) {
                        if (values[j] == "None (CANADA)")
                            values[j] = null;
                        if (record[name] == values[j])
                                return record;
                    }
                }
                return null;
            };
        }