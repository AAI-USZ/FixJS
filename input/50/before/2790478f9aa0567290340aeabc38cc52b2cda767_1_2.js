function (err, resp, source) {
            if (err) {
                cb(err, null);
            } else {
                $this.compile(source, cb);
            }
        }