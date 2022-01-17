function (err, adresses){
            if (err) {
                this.emit("error", err);
                return;
            }

            url_data.urloptions.headers['host'] = url_data.urloptions.hostname+url_data.urloptions.port;
            url_data.urloptions.hostname = adresses[0];
            url_data.urloptions.host=url_data.urloptions.hostname + (url_data.urloptions.port? ':' + url_data.urloptions.port: '');

            this._runStream(url_data, url);
        }