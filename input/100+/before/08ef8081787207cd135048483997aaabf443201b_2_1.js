function(str) {
            //player connect
            var parts = str.match(/^([0-9\-: ]+) \[INFO\] ([^\s]+) \[\/([\d\.:]+)\] logged in with entity id ([\d]+) at \((\[([^\s]+)\] )?([\d\.\-\, ]+)\)$/);

            if(parts) {
                //0 = entire message,
                //1 = timestamp,
                //2 = player name,
                //3 = IP:Port
                //4 = entity id
                //5 = [worldname]
                //6 = worldname
                //7 = location logged into
                var name = parts[2];

                if(this._players.indexOf(name) === -1) {
                    this.emit('player::connect', name);
                    this._players.push({
			connect: parts[1],
			name: parts[2],
			ip: parts[3],
			id: parts[4]
		    });
                }
            }
        }