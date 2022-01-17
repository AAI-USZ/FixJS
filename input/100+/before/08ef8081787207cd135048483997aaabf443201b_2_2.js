function(str) {
            //errors
            var parts = str.match(/^([0-9\-: ]+) \[(SEVERE|WARNING|FATAL)\] (.*)$/);

            if(parts) {
                //0 = entire message,
                //1 = timestamp,
                //2 = message type,
                //3 = message

                //I have NO IDEA why this is just a warning...
                if(parts[2] == 'WARNING' && parts[3] == '**** FAILED TO BIND TO PORT!') {
                    //we need to log the error and kill the server
                    this.log.error('Server unable to start: ' + parts[3]);
		    this.emit('startup::fail', new Error(parts[3]));
                } else {
                    this.log.error('Server Error: ' + parts[0]);
		    this.emit('error', parts[0]);
                }
            }
        }