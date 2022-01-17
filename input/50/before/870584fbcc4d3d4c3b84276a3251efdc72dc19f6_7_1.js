function (err) {
                logger.error('Couldn\'t retrive session for socket. ' + err.stack);
                socket.disconnect();
            }