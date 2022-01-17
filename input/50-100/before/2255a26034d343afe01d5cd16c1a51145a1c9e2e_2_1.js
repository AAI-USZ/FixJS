function(name) {
        // Make sure the object exists, or create it.
        if (this.records[name] === undefined) {
            this.records[name] = {
                id: name
            }
        }
        
        // Begin recording
        this.records[name].start = Date.now();
    }