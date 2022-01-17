function (s, _, _, cb) {
                try {
                    evaluator(s, cb)
                }
                catch (err) {
                    cb(err);
                }
            }