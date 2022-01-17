function(str) {
            //version string
            var parts = str.match(/^([0-9\-: ]+) \[INFO\] Starting minecraft server version ([\d\.]+)$/);

            if(parts) {
                //0 = entire message,
                //1 = timestamp,
                //2 = version
                this._version = parts[2];
            }
        }