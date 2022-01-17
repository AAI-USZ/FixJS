function(res) {
                    Object.append(this, res.value);
                    if (callback) {
                        callback();
                    }
                }