function () { 
			console.log('Emit ', arguments);
			_emit.apply(self, arguments);
		}