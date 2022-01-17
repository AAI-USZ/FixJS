function(a, b) {
                                if (a.timestamp && b.timestamp) {
                                    var ts_a = parseInt(a.timestamp);
                                    var ts_b = parseInt(b.timestamp);
                                    return ts_b - ts_a;
                                } else {
                                    return a.filename.localeCompare(b.filename);
                                }
                            }