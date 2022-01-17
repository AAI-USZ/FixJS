function(target, result) {
		if(result == undefined) return;

		if (result.success) {
			this.sendData('action_performed', {action: result.name, emiterId: this.id, targetId: target.id});
			if (this.client != undefined) this.client.socket.emit('action_success', {action: result.name, emiterId: this.id, targetId: target.id});		
		} else {
			if (this.client != undefined) this.client.socket.emit('action_fail', {action: result.name, emiterId: this.id, targetId: target.id});				
		}
	}