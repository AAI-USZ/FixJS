function() {
			//This function needs to accept params and return HTML
			return runtime.capture(info,
				func.apply({'pos': info.length}, arguments) );
		}