function(Context,first,localObj,callback){
	var i = 0,
		arr = first ? this._executionOrders : localObj.threads[i],
		l = arr.length,
		executing = false,
		_self = this,
		tempColl = [],
		buffer = this._master && Context.bufferMode,
		exit = false;
	while(i < l && !Context.exitNow){
		localObj.threads[i] = arr[i].reduce(function(previous,current){
			if(executing || Context.exitNow){
				return previous.concat(current);
			}
			if(typeof localObj.status[current] === "undefined"){
				if(_self._executionStack[current].needsCallback){
					localObj.status[current] = 'executing';
					if(Context.debugMode) Context._current = current;
					_self._executionStack[current].execute(_self,Context,function(_string){
						localObj.collected[current] = _string;
						localObj.status[current] = 'done';
						_subExecute.call(_self, Context,false,localObj,callback);
					});
					executing = true;
					return previous;
				}
				else{
					if(Context.debugMode) Context._current = current;
					localObj.collected[current] = _self._executionStack[current].execute(_self,Context);
					localObj.status[current] = 'done';
					return previous;
				}
			}
			if(localObj.status[current] === 'executing'){
				executing = true;
				return previous
			}
			if(localObj.status[current] === "done"){
				return previous;
			}
		},[]);
		if(localObj.threads[i].length === 0){
			localObj.threads.splice(i,1);
			l--;
		}
		executing = false;
		i++;
	}
	//render and stuff
	return _finish.call(this,Context,localObj,callback,tempColl);
}