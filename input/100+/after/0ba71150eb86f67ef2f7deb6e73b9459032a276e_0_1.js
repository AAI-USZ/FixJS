function(e, worker) {
        var self = this;
        // Check to avoid dupes
        //console.log("in add_event: " + e.id + " " + this.find_event(e.id));
        if (self.find_event(e.id).length == 0) {
            //console.log("  Adding " + e.id);
            self.events.push(e);
            if (self.find_repo(e.repo).length == 0) {
                self.repos.push(e.repo);
            }
            self.save(function(err, obj) {
                if (err) {
                    logger.error("Saving issue: ", err, self.key);
                }
                worker.finish();
            });
        } else {
            worker.finish(); // nothing to do here
        }
    }