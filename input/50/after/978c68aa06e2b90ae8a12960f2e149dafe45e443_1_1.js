function(func, self) {
		eventHandlerList.push(function(time){ func.call(self,time); });
		//eventHandlerList.push(func);
	}