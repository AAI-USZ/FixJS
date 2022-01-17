function(err){
        if(err) {
            logIf(0, "Error making directory " + filename + " because " + err, self);
            // write error to socket
            wwenc(self.socket, "550 \"" + filename + "\" directory NOT created\r\n");
            return;
        }
        wwenc(self.socket, "257 \"" + filename + "\" directory created\r\n");
    }