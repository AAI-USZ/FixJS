function(filename) {
        var me = this;
        this.handle = logfile.init(filename);
        this.pid = process.fork();
        if (!this.pid) {
            // child
            while (true) {
                process.sleep(5);
                logfile.flush(me.handle);
            }
        }
        else {
            log('Started logfile process ' + this.pid);
        }
    }