function(err){
        if (err) {
            logIf(0, "Error deleting file: "+filename+", "+err, self);
            // write error to socket
            wwenc(self.socket, "550 Permission denied\r\n");
        } else {
            wwenc(self.socket, "250 File deleted\r\n");
        }
    }