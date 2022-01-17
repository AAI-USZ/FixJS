function(key, data, notifyEverbody) {
		if (notifyEverbody == undefined) notifyEverbody = false;

		var emitter = (this.client == undefined || notifyEverbody) ? Cassidie.netConnection : this.client.socket.broadcast;
		
		data. id = this.id;
		emitter.to(this.level.name).emit(key, data);			
	}