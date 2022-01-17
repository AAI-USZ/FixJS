function(parameter, value, notify) {
			if (notify == undefined) notify = true;
	
			eval('this.'+parameter+'=value');

			if (notify) Cassidie.socket.emit('entity_set_parameter', {id: this.id, parameter: parameter, value: value});
		}