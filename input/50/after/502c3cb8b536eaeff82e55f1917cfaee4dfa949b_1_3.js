function(data) {
			this.fire('datachange', { action: 'delete', id: id });
			if (success) success.call(context, deltaId);
		}