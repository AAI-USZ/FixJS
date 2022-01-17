function(person) {
		this.connected = true;
		var oldid = person.userid;
		this.people.push(person);
		person.rename(this.name, oldid);
		//console.log(''+this.name+' merging: socket '+person.socket.id+' of ');
		emit(person.socket, 'update', {
			name: this.name,
			userid: this.userid,
			named: true,
			token: this.token
		});
		person.user = this;
		for (var i in person.rooms) {
			if (!this.roomCount[i]) {
				person.rooms[i].join(this);
				this.roomCount[i] = 0;
			}
			this.roomCount[i]++;
		}
	}