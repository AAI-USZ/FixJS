function(a, b) {
                                if (a.timestamp && b.timestamp) {
                                    var ts_a = parseInt(a.timestamp);
                                    var ts_b = parseInt(b.timestamp);
                                    return ts_a < ts_b;
                                } else {
                                    return a.filename.localeCompare(b.filename);
                                }
                            }