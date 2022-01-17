function(data) {
            // If no name provided, don't add it to list, but send him the status
            if (!data.name) {
                socket.emit('count-update', { count: Users.size });
                return;
            }

            // Add user to list and send update to everyone
            if (Users.add(data.name)) {
                io.sockets.emit('count-update', { count: Users.size });
            } else {
                // or just himself if count did not change
                socket.emit('count-update', { count: Users.size });
            }
  
            // Client disconnects, remove user, and send update to everyone except him
            socket.on('disconnect', function() {
                if (Users.remove(data.name)) {
                    socket.broadcast.emit('count-update', { count: Users.size });
                }
            });
        }