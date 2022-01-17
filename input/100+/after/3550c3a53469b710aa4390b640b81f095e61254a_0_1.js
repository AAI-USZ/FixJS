function(data){
			this.refreshStreetsDataCallback(data, cityClosure);
			if(doneCallback){
				doneCallback.apply(context, []);
			}
		}