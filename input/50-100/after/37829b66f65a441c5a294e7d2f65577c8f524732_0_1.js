function (err, adresses){
            if (err) {
                this.emit("error", err);
                return;
            }

            var portAddition = (url_data.urloptions.port||80)==80?'': ':' + url_data.urloptions.port;
            url_data.urloptions.headers['host'] = url_data.urloptions.host + portAddition;
            url_data.urloptions.host=adresses[0]+portAddition;

            this._runStream(url_data, url);
        }