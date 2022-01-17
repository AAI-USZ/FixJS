function (err) {
                        if (err) { 
                            callback(err);
                        } else {
                            fs.unlinkSync(_workspace + filename);
                            callback();
                        }
                    }