function(name, authenticated) {
		// skip the login server
		var userid = toUserid(name);

		if (users[userid] && users[userid] !== this) {
			return false;
		}

		if (this.named) this.prevNames[this.userid] = this.name;

		if (typeof authenticated === 'undefined' && userid === this.userid) {
			authenticated = this.authenticated;
		}

		if (userid !== this.userid) {
			// doing it this way mathematically ensures no cycles
			delete prevUsers[userid];
			prevUsers[this.userid] = userid;
		}

		this.name = name;
		var oldid = this.userid;
		delete users[oldid];
		this.userid = userid;
		users[this.userid] = this;
		this.authenticated = !!authenticated;

		if (config.localsysop && this.ip === '127.0.0.1') {
			this.group = config.groupsranking[config.groupsranking.length - 1];
		}

		for (var i=0; i<this.people.length; i++) {
			this.people[i].rename(name, oldid);
			//console.log(''+name+' renaming: socket '+i+' of '+this.people.length);
			emit(this.people[i].socket, 'update', {
				name: name,
				userid: this.userid,
				named: true,
				token: this.token
			});
		}
		var joining = !this.named;
		this.named = true;
		for (var i in this.roomCount) {
			Rooms.get(i).rename(this, oldid, joining);
		}
		rooms.lobby.usersChanged = true;
		return true;
	}