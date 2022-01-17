function Deferred(canceller){
	var result, finished, isError, waiting = [], handled;
	var promise = this.promise = new Promise();
	var context = exports.currentContext;

	function notifyAll(value){
		var previousContext = exports.currentContext;
		if(finished){
			throw new Error("This deferred has already been resolved");
		}
		try{
			if(previousContext !== context){
				if(previousContext && previousContext.suspend){
					previousContext.suspend();
				}
				exports.currentContext = context;
				if(context && context.resume){
					context.resume();
				}
			}
			result = value;
			finished = true;
			for(var i = 0; i < waiting.length; i++){
				notify(waiting[i]);
			}
		}
		finally{
			if(previousContext !== context){
				if(context && context.suspend){
					context.suspend();
				}
				if(previousContext && previousContext.resume){
					previousContext.resume();
				}
				exports.currentContext = previousContext;
			}
		}
	}
	function notify(listener){
		var func = (isError ? listener.error : listener.resolved);
		if(func){
			handled = true;
				try{
					var newResult = func(result);
					if(newResult && typeof newResult.then === "function"){
						newResult.then(listener.deferred.resolve, listener.deferred.reject);
						return;
					}
					listener.deferred.resolve(newResult);
				}
				catch(e){
					listener.deferred.reject(e);
				}
		}
		else{
			if(isError){
				if (listener.deferred.reject(result, true)) {
					handled = true;
					}
			}
			else{
				listener.deferred.resolve.call(listener.deferred, result);
			}
		}
	}
	// calling resolve will resolve the promise
	this.resolve = this.callback = this.emitSuccess = function(value){
		notifyAll(value);
	};

	// calling error will indicate that the promise failed
	var reject = this.reject = this.errback = this.emitError = function(error, dontThrow){
		isError = true;
		notifyAll(error);
		if (!dontThrow && typeof setTimeout !== "undefined") {
			setTimeout(function () {
				if (!handled) {
					throw error;
				}
			}, exports.errorTimeout);
		}
		return handled;
	};

	// call progress to provide updates on the progress on the completion of the promise
	this.progress = function(update){
		for(var i = 0; i < waiting.length; i++){
			var progress = waiting[i].progress;
			progress && progress(update);
		}
	}
	// provide the implementation of the promise
	this.then = promise.then = function(resolvedCallback, errorCallback, progressCallback){
		var returnDeferred = new Deferred(promise.cancel);
		var listener = {resolved: resolvedCallback, error: errorCallback, progress: progressCallback, deferred: returnDeferred};
		if(finished){
			notify(listener);
		}
		else{
			waiting.push(listener);
		}
		return returnDeferred.promise;
	};
	var timeout;
	if(typeof setTimeout !== "undefined") {
		this.timeout = function (ms) {
			if (ms === undefined) {
				return timeout;
			}
			timeout = ms;
			setTimeout(function () {
				if (!finished) {
					if (promise.cancel) {
						promise.cancel(new Error("timeout"));
					}
					else {
						reject(new Error("timeout"));
					}
				}
			}, ms);
			return promise;
		};
	}

	if(canceller){
		this.cancel = promise.cancel = function(){
			var error = canceller();
			if(!(error instanceof Error)){
				error = new Error(error);
			}
			reject(error);
		}
	}
	freeze(promise);
}