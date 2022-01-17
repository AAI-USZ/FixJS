function (err) {
                logger.error('Couldn\'t retrieve session for socket. ' + err.stack);
                socket.disconnect();
            }