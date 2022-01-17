function(res) {
                    Object.append(this, JSON.parse(res.value));
                    if (callback) {
                        callback();
                    }
                }