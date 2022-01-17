function() {
                    logIf(3, "Passive data listener closed", conn);
                    if (socket.readable) socket.resume(); // just in case
                }