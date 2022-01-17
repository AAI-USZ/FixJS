function() {
                if (Users.remove(data.name)) {
                    socket.broadcast.emit('count-update', { count: Users.size });
                }
            }