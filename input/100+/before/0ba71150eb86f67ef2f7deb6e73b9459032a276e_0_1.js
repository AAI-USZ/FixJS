function(err, obj) {
                if (err) {
                    logger.error("Saving issue: ", err, self.key);
                }
                worker.finish();
            }