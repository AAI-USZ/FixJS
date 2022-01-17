function(p1, p2, format, rated, p1team, p2team) {
		var newRoom;
		p1 = Users.get(p1);
		p2 = Users.get(p2);

		if (!p1 || !p2) {
			// most likely, a user was banned during the battle start procedure
			selfR.cancelSearch(p1, true);
			selfR.cancelSearch(p2, true);
			return;
		}
		if (p1 === p2) {
			selfR.cancelSearch(p1, true);
			selfR.cancelSearch(p2, true);
			p1.emit('message', 'You can\'t battle your own account. Please use something like Private Browsing to battle yourself.');
			return;
		}

		if (lockdown) {
			selfR.cancelSearch(p1, true);
			selfR.cancelSearch(p2, true);
			p1.emit('message', 'The server is shutting down. Battles cannot be started at this time.');
			p2.emit('message', 'The server is shutting down. Battles cannot be started at this time.');
			selfR.update();
			return;
		}

		//console.log('BATTLE START BETWEEN: '+p1.userid+' '+p2.userid);
		var i = selfR.numRooms+1;
		var formaturlid = format.toLowerCase().replace(/[^a-z0-9]+/g,'');
		while(rooms['battle-'+formaturlid+i]) {
			i++;
		}
		selfR.numRooms = i;
		newRoom = selfR.addRoom('battle-'+formaturlid+i, format, p1, p2, selfR.id, rated);
		p1.joinRoom(newRoom);
		p2.joinRoom(newRoom);
		newRoom.joinBattle(p1, p1team);
		newRoom.joinBattle(p2, p2team);
		selfR.cancelSearch(p1, true);
		selfR.cancelSearch(p2, true);
		selfR.roomsChanged = true;
		if (config.reportbattles) {
			selfR.log.push({
				name: p1.name,
				name2: p2.name,
				room: newRoom.id,
				format: format,
				action: 'battle'
			});
			selfR.update();
		}
	}