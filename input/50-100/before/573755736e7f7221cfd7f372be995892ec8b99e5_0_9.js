function(err){
        if(err) {
            logIf(3, "Error renaming file from " + self.filefrom + " to " + fileto, self.socket);
            wwenc(self.socket, "550 Rename failed\r\n");
        } else {
            wwenc(self.socket, "250 File renamed successfully\r\n");
        }
    }