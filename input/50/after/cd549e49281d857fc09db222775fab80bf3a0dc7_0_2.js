function(data) {
			console.log("removing");
			this.fire('datachange', { action: 'delete', id: id });
			if (success) success.call(context, deltaId);
		}