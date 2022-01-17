function() {
                // abort immediately, this is regular file
                this.abort();
                callback(false);
            }