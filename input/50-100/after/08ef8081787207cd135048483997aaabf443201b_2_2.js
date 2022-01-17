function(str) {
            //player disconnect
            var i, player,
            parts = str.match(/^([0-9\-: ]+) \[INFO\] ([^\s]+) lost connection: ([\w\. ]+)$/);

            if(parts) {
                //0 = entire message,
                //1 = timestamp,
                //2 = player name,
                //3 = reason
                this.log.debug('Player disconnected: %s', parts[2]);
                this.emit('player::disconnect', parts[2]);
		this._removePlayer(parts[2]);
            }
        }