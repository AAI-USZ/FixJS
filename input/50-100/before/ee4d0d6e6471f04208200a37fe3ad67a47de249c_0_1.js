function(data) {
                console.log('socket connected');
                if (ui.wasConnected) {
                    this.cancelNotification();
                    window.location = window.location;
                } else {
                    ui.wasConnected = true;
                    ui.socket.emit('join', { gameKey: ui.gameKey });
                }
            }